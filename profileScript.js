swap()

const urlprams = new URLSearchParams(window.location.search)
const userid = urlprams.get("userId")

function getUser (){
    toogleLoader(true)
    axios.get(`https://tarmeezacademy.com/api/v1/users/${userid}`)
    .then((respone) => {
        // console.log(respone.data.data)
        let post = respone.data.data
        document.getElementById("user-information").innerHTML= 
        `
        <div class="row">
        <div class="col-3" style="margin-top: 17px;">
            <img src="${post.profile_image}"  style="width: 150px; height: 150px; border-radius: 200px;">

        </div>

        <div class="col-4 d-flex " style="flex-direction: column; justify-content: space-evenly; font-size: 20px;  ">
            <div>
                ${post.email}
            </div>
            <div>
                ${post.name}
            </div> <div>
                ${post.username}
            </div>
        </div>
        
        
        <div class="col-3 d-flex " style="flex-direction: column; justify-content: space-evenly;  ">
            <div class="number-info">
                <span>${post.posts_count}</span>Posts
            </div>

            <div class="number-info">
                <span>${post.comments_count}</span>Comments
            </div>
        </div>  

    </div>

        `
        document.getElementById("nameofuser").innerHTML=`${post.username}' Post`
    })
    .catch((error) => {
        showsuccess(error.response.data.message,"danger")
      })
      .finally(() =>{
        toogleLoader(false)
      })

}
getUser()


getPostUser()

function getPostUser(){
    toogleLoader(true)

    axios.get(`https://tarmeezacademy.com/api/v1/users/${userid}/posts`)

            .then((respone) => {

            let posts = respone.data.data
            document.getElementById("posts-user").innerHTML=""
                
            for (post of posts){
                let user = getcurrentUser()
                let isMyPost = user != null && post.author.id == user.id
                let BtContent = ``
                if (isMyPost){
                  BtContent = `
                  <button type="button" id="delete" class="btn btn-danger " style="float: right;" onclick=" DeleteBt('${encodeURIComponent(JSON.stringify(post))}')" >Delete</button>

                   <button type="button" id="edit" class="btn btn-secondary mx-2" style="float: right;" onclick=" editBt('${encodeURIComponent(JSON.stringify(post))}')" >Edit</button>`
              }
              document.getElementById("posts-user").innerHTML+=`
              <div class="card mt-3 shadow" style="cursor: pointer;" >
                          <div class="card-header">
                              <img src="${post.author.profile_image}" width="40px" height="40px" class="rounded-circle border border-2">
                              <b>${post.author.username}</b>
                              ${BtContent}
  
                          </div>
  
                          <div class="card-body" ">
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