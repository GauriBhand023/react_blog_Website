import React, {useState, useEffect, useCallback} from 'react'
import './profile.css'

import Footer from '../../components/Footer/Footer'
import NavigationBar from '../../components/NavBar/NavigationBar'
import db from '../../utils/db.json'
import AuthorCard from '../../components/AuthorCard/AuthorCard'
import FilterHeader from '../../components/FilterHeader/FilterHeader'
import UserPostList from '../../components/UserPostsList/UserPostList'

function Profile({match}) {
  const [posts, setPosts] = useState([]) 
  const [author, setAuthor] = useState({}) 
  const [activeButton, setActiveButton] = useState('') 

  const fetchPost = useCallback(async id => {
    let posts = db.posts.filter(post => post.authorId === parseInt(id))

    setPosts(posts)
  }, [])

  const fetchUser = useCallback(async id => {
    const user = db.authors[id]
    setAuthor(user)
  }, [])


  useEffect(() => {
    fetchPost(match.params.authorId)
  }, [fetchPost, match.params.authorId])

  useEffect(() => {
    fetchUser(match.params.authorId)
  }, [fetchUser, match.params.authorId])

  const ascDate = useCallback(() => {
    setActiveButton('ascDate')
    let data = posts

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data])
  }, [posts])


  const dscDate = useCallback(() => {
    setActiveButton('dscDate')
    let data = posts

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }
    setPosts([...data.reverse()])
  }, [posts])

  const ascLike = useCallback(() => {
    setActiveButton('ascLike')
    let data = posts

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data])
  }, [posts])

  const dscLike = useCallback(() => {
    setActiveButton('dscLike')
    let data = posts

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data.reverse()])
  }, [posts])

  return (
    <div>
      {/* Author Details */}
      <AuthorCard author={author} />

      <div className="container">
        <h3 className="pt-4 pl-4 pb-3">Posts</h3>

        {/* Filter Header */}
        <FilterHeader
          activeButton={activeButton}
          ascDate={ascDate}
          dscDate={dscDate}
          ascLike={ascLike}
          dscLike={dscLike}
        />

        <UserPostList posts={posts} />
      </div>
    </div>
  )
}
export default Profile
