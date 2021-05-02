import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MessageError from './components/MessageError'
import Raiting from './components/Raiting'
import Header from './components/Header'

import './App.scss'
import Spinner from './components/Spinner'


function App() {

  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const onMouseEnter = (index) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index) => {
    setRating(index);
  };
  const [comic, setComic] = useState(null)
  const [someComicId, setSomeComicId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fail, setFail] = useState(null)

  const fetchApi = (id) => {
    setLoading(true)
    axios
      .get(
        `https://secret-ocean-49799.herokuapp.com/http://xkcd.com/${id}/info.0.json`
      )
      .then((res) => setComic(res.data))
      .catch((err) => {
        console.log(err)
        setFail(err)
      })
      .finally(() => setLoading(false))
  }

  const someComic = () => {
    setLoading(true)
    axios
      .get('https://secret-ocean-49799.herokuapp.com/http://xkcd.com/info.0.json')
      .then((res) => {
        setComic(res.data)
        setSomeComicId(res.data.num)
      })
      .catch((err) => {
        console.log(err)
        setFail(err)
      })
      .finally(() => setLoading(false))
  }

  const randomComic = () => {
    let id = Math.floor(Math.random() * (someComicId - 1) + 1)
    fetchApi(id)
  }


  useEffect(() => {
    someComic()
  }, [])

  if (fail) {
    return <MessageError />
  }

  return (
    <>
      <Header />
      <section className='content' >
        <div className="content__title">
          <h2>{loading ? 'Loading...' : comic.title}</h2>
          <button disabled={loading} onClick={() => randomComic()}>
            Random comic
          </button>
        </div>
        {loading ? (
          <div className='loading'>
            <Spinner />
          </div>
        ) : (
          <>
          <div className='content__img'>
            <img src={comic.img} title={comic.alt} alt={comic.title} />
          </div>
          <p className="content__description">{comic.alt}</p>
          </>
        )}
        <div
          comic={comic}
          loading={loading}
          fetchApi={fetchApi}
          fetchRandomComic={randomComic}
        />

        <div className="raiting">
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <Raiting
              index={index}
              rating={rating}
              hoverRating={hoverRating}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onSaveRating={onSaveRating}
            />
          )
        })}
        </div>
      </section>
    </>
  )
}

export default App