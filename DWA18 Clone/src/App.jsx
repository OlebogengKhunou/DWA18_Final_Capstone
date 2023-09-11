import React from 'react'
import SignIn from './components/SignIn';
import {Preview} from './components/Preview';
import { BackButton } from './components/Preview';
import Season from './components/Season'
import Episodes from './components/Episodes';
import Favorites from './components/Favourites';
import History from './components/History';
import Carousel from './components/Carousel ';
import { supabase } from './components/SignIn';
import { UseContextValue } from './components/UseContextValues'; 
import { SearchSorting } from './components/Sorting ';
import { PreviewSorting } from './components/Sorting ';


function App() {
  const {userLogIn, phase, setPhase, phaseState, setPhaseState, favourite } = UseContextValue()

  
//Fetching Preview data and set PreviewPhase to fetched data then set Phase to Preview.
  React.useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(res => res.json())
      .then(data => {
        if (phase === 'startPhase') {
          setPhaseState(prevState => ({
            ...prevState,
            Preview: data
          }))
          setPhase('previewPhase')
          setPhaseState(prevState => ({
            ...prevState,
            DefaultPreview: data
          }))
        }
      })
  }, [phase])

  //Audio play
  const [audioPlaying, setaudioPlaying] = React.useState(
    {
      title: '',
      audio: ''
    }
  );

  //Collects episode details via attributes
  async function HandleAudioPlay(event)  {
    const audioToPlay = event.target.id
    const audioTitle = event.target.title
    const EpisodeDescription =  event.target.getAttribute('data-description')
    const EpisodeNumber =  event.target.getAttribute('data-episodenumber')
    
    setaudioPlaying(prev => ({
      ...prev,
      audio: audioToPlay 
    }))
    setaudioPlaying(prev => ({
      ...prev,
      title: audioTitle
  }))

    const Season = event.target.getAttribute('data-seasontitle')
    const Show = event.target.getAttribute('data-showtitle')
    const Email = userLogIn
    const EpisodeTitle = audioTitle
    const EpisodeFile = audioToPlay

    try {
        const { data, error } = await supabase
            .from('History')
            .insert([
                { Season, Show, EpisodeTitle, EpisodeDescription, EpisodeNumber, EpisodeFile, Email },
            ]);

        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            // console.log('Data inserted successfully:', data);
        }
    } catch (error) {
        console.error('Error inserting data:', error.message);
    };
}

  function HandleMiniPlayClose() {
      const shouldClose = confirm("Are you sure you want to close miniplayer?");
      if (shouldClose) {
        setaudioPlaying(prevA => ({
          ...prevA,
          audio: '', title: ''
        }))
      }
    } 

  return (
    <>
      {(phase !== 'signUpPhase' && phase !== 'startPhase') &&
       <>
       <nav><div >
        <h2>PopCast & Chill</h2>
        <div className='topnav'>
             <h5><img className='profile' src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'/> {userLogIn}</h5>
             <BackButton/>
           </div> 
        <div className='bottomNav'>
        {phase === "previewPhase" && <SearchSorting />}
        <div className='HistoryAndFavButtons'>
        {phase !== "favouritePhase" && <button onClick={()=>setPhase('favouritePhase')}>Favourites</button>}
        {phase !== "historyPhase" && <button onClick={()=>setPhase('historyPhase')}>History</button>}  
        </div>
        </div>
      </div>
       </nav>
      {phase === "previewPhase" &&
      <>
      <h1>Popular Shows</h1>
      <div className='Causarol'>
        <Carousel
        //  HandlePreviewClick={HandlePreviewClick} 
        />
        </div>
        <h1>Only The Best To Watch</h1>
        <PreviewSorting/>
        </>
          }
      </>
  
      }
       <div className='DisplayStage'>
      
      { phase === 'signUpPhase' ? <SignIn /> :
        phase === 'startPhase' ? <div>{"LOADING..."}</div>  :
        phase === "favouritePhase" ? <Favorites
                                     HandleAudioPlay={HandleAudioPlay}
                                     email={userLogIn}/>:
        phase === "historyPhase" ? <History
                                     email={userLogIn}/>:                          
        phase ===  'previewPhase' ?  <Preview /> :
        phase === "seasonPhase"  ?  <Season />:
        phase === "episodePhase" ?  <Episodes
                                    HandleAudioPlay={HandleAudioPlay}
                                    Preview={phaseState.Episode}
                                    favouriteSeasonTitle={favourite.favouriteSeasonTitle}
                                    favouriteShowTitle={favourite.favouriteShowTitle}
                                    email={userLogIn}
                                    /> : 
        console.log('Episode Not fount')
      }
     </div>
     
      {(audioPlaying.audio  && phase !== 'signUpPhase' && phase !== 'startPhase') &&
        <div id='miniplayer' className="episodes">
          <h3>{audioPlaying.title}</h3>
          <audio src={audioPlaying.audio} controls autoPlay mute/>
          <button onClick={HandleMiniPlayClose}>Close</button>
        </div>
      }
    </>

  )
}

export default App;