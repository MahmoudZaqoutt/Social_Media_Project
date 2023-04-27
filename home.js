



let currentPage = 1
let lastPage = 1
window.addEventListener("scroll", function() {
  
      const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;

      if (endOfPage && currentPage < lastPage){
            currentPage = currentPage + 1
            getPosts (false, currentPage)
      }
  

});






    

function userclicked(userId){
  window.location=`profile.html?userId=${userId}`
}

function getPosts(reload=true , page=1){
  toogleLoader(true)
  axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
    .then((respone) => {
        let posts = respone.data.data
        lastPage = respone.data.meta.last_page

        if (reload){
          document.getElementById("posts").innerHTML=""
        }

        


        for (post of posts){
            let user = getcurrentUser()
            let isMyPost = user != null && post.author.id == user.id
            let BtContent = ``
            if (isMyPost){
                BtContent = `
                <button type="button" id="delete" class="btn btn-danger " style="float: right;" onclick=" DeleteBt('${encodeURIComponent(JSON.stringify(post))}')" >Delete</button>

                 <button type="button" id="edit" class="btn btn-secondary mx-2" style="float: right;" onclick=" editBt('${encodeURIComponent(JSON.stringify(post))}')" >Edit</button>`
            }
            document.getElementById("posts").innerHTML+=`
            <div class="card mt-5 shadow" style="cursor: pointer;" >
                        <div class="card-header">

                        <span onclick="userclicked(${post.author.id})" >
                            <img src="${post.author.profile_image}" width="40px" height="40px" class="rounded-circle border border-2">
                            <b>${post.author.username}</b>
                        </span>   

                            ${BtContent}

                        </div>

                        <div class="card-body" onclick="postClicked(${post.id})">
                            <img src="${post.image}" style="width: 100%; height: 350px;">
                            <h6 class="card-title text-body-tertiary" >${post.created_at}</h6>
                            <h5>${post.title}</h5>
                            <p class="card-text">  ${post.body} </p>
                                                
                            <hr>

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                <span>(${post.comments_count}) comments </span>

                                <span id="tags-${post.id}">
                                  
                                </span>
                            </div>
                            


                            </div>
                    </div>
            
            `
                    const posttags = `tags-${post.id}`
                    document.getElementById(posttags).innerHTML=""
                    for(tag of post.tags)
                        document.getElementById(posttags).innerHTML+= `
                            <button class="btn btn-sm rounded-5" style="background-color: gray; color: white">
                            ${tag.name}
                            </button>
              
                          `
            }
            
        

      
    })
    .catch((error) => {
      showsuccess(error.response.data.message,"danger")
    })
    .finally(() =>{
      toogleLoader(false)
    })

}  
getPosts()
swap()


function CreatePost1(){
  let postModal = new bootstrap.Modal(document.getElementById("creatPostModal"),{})
  postModal.toggle()
  document.getElementById("exampleModalLabel1").innerHTML="Create A New Post"
  document.getElementById("title").value=""
  document.getElementById("bodycontent").value=""
  document.getElementById("post-id").value="" 
  document.getElementById("Create-Create").innerHTML="Create"

}







        function postClicked(postId){
          window.location = ` postDetalis.html?postId=${postId}`
        }





