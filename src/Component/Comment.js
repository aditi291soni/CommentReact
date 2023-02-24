import React,{useState,useEffect} from 'react'
import css from './Comment.module.css'
import Reply from './Reply'
const { v4: uuidv4 } = require('uuid');

const Comment = () => {
    const [single, setsingle] = useState({
        desc:"",
        date:"",
        id:"",
        like:0,
        dislike:0,

    });
    const [list, setlist] = useState([]);
    const [sort,setSort]=useState(false)

     const[comment,setComment]=useState("")
     useEffect(() => {
       console.log("list",sort)
     }, [sort]);
    const sortHandler=(e)=>{
    sort?list.sort(function(a, b){return a.like - b.like}):list.sort(function(a, b){return b.like- a.like});
    setSort(!sort)

   setlist(list)
    console.log("sort",list)

    }
    const sortdislikeHandler=(e)=>{
        sort?list.sort(function(a, b){return a.dislike - b.dislike}):list.sort(function(a, b){return b.dislike- a.dislike});
        setSort(!sort)
    
       setlist(list)
    }
    const sortDateHandler=(e)=>{
        sort?list.sort(function(a, b){return new Date(a.date) - new Date(b.date)}):list.sort(function(a, b){return new Date(b.date) - new Date(a.date)});

           
          setSort(!sort)
    
       setlist(list)
        console.log("sort",list)
    
        }
    const singleCommentHandler=(e)=>{
        setComment(e.target.value)
        console.log(single);
    }
    const likeHandler=(id)=>{
        console.log(id, list)
        setlist([...list.map((e)=>{
            
            if(e.id===id ){
                console.log("e",e.id)
               

                    e.like+=1; 
                

            }
            return e
        
    })]
    
    )
    }
    const dislikeHandler=(id)=>{
        setlist([...list.map((e)=>{
            
            if(e.id===id ){
                console.log("e",e.id)
               

                    e.dislike+=1; 
                

            }
            return e
        
    })]
    
    )
    }
    const CommentHandler=(e)=>{
            console.log("single",single)
        
        setlist([...list,{
            desc:comment,
            date:new Date(Date.now()).toLocaleString(),
            id:uuidv4(),
            like:0,
            dislike:0
        }])
        
        setComment("")
    }
  return (
    <div className={css.main} >
    <h2>Comments</h2>
      <div  class="form-floating">
  <textarea onChange={singleCommentHandler} value={comment} name='desc' className="form-control w-75 p-4" placeholder="Leave a comment here" id="floatingTextarea">

  </textarea>
  <button onClick={CommentHandler} type="button" disabled={comment.length===0} class="btn btn-primary m-2">Comment</button>
  
  <button type="button" onClick={sortHandler} class="btn btn-primary m-2">SortByLike</button>
  <button type="button" onClick={sortdislikeHandler} class="btn btn-primary m-2">SortByDislike</button>

  <button type="button" onClick={sortDateHandler} class="btn btn-primary m-2">SortByDate</button>

  <div className={css.commentList}>
{<p>Total Comments:{list.length} </p>}
{list.map((e)=>
    (
        <>
        <hr />
   <p >  {(e.desc).trim()}  <br />{e.date}  <button  onClick={()=>likeHandler(e.id)} type="button" class="btn btn-primary m-2">
          Like {e.like}
        </button>
        <button type="button" onClick={()=>dislikeHandler(e.id)}  class="btn btn-primary m-2">
          Dislike {e.dislike}
        </button></p> 
<Reply  />    
</>
    )
)}
  </div>
</div>
</div>

  )
}

export default Comment
