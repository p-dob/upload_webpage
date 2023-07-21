import React from 'react';
import Comment from './Comment';
import {v4 as uuid} from 'uuid';

const CommentsList = ({comments}) => {
  return comments.map(comment => {
   return(
    <div key={uuid()}>
        <Comment data={comment}/>
        <div className='ml-5 pl-2 border-l border-l-black '>
            {/* Reply feature by caling CommentsList again and passing replies array, if array is empty it wont render anthing. Reccursion by calling component again*/ }
            <CommentsList comments={comment.replies}/>
        </div>
   </div>
   )
})
}

export default CommentsList