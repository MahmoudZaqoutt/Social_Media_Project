function userProfile(){
    const user = getcurrentUser()  
    window.location=`profile.html?userId=${user.id}`

}




function DeleteBt(postOpj){
    let postModal = new bootstrap.Modal(document.getElementById("deletePostModal"),{})
    postModal.toggle()
    let post = JSON.parse(decodeURIComponent(postOpj))
    document.getElementById("post-delete-id").value=post.id 

}


function confirmDelete(postOpj){
    const postid = document.getElementById("post-delete-id").value
    toogleLoader(true)
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postid}`,{
        headers:{
                    "authorization": `Bearer ${localStorage.getItem("token")}`

                }
        } 
    )
    .then((respone) => {
        getPosts()
        getPostUser()
        getUser()
        showsuccess("Delete Post Successfuly!","success")
    })
    .catch((error) => {
        showsuccess(error.response.data.message,"danger")
      })
      .finally(() => {
        toogleLoader(false)
      })
    const modal = document.getElementById("deletePostModal")
    const modal1 = bootstrap.Modal.getInstance(modal)
    modal1.hide()

}


function editBt(postOpj){ 
    let postModal = new bootstrap.Modal(document.getElementById("creatPostModal"),{})
    postModal.toggle()
    let post = JSON.parse(decodeURIComponent(postOpj))
    document.getElementById("exampleModalLabel1").innerHTML="Edit Post"
    document.getElementById("title").value=post.title 
    document.getElementById("bodycontent").value=post.body 
    document.getElementById("post-id").value=post.id 
    document.getElementById("Create-Create").innerHTML="Update"


    // post-delete-id
}



function CreaterBt(){
       
    let postId= document.getElementById("post-id").value 
    const title = document.getElementById("title").value
    const bodycontent = document.getElementById("bodycontent").value
    const image = document.getElementById("image").files[0]
    let formData = new FormData()
    formData.append("title" , title)
    formData.append("body",bodycontent )
    formData.append("image",image)
    let isCreated = postId == null || postId == ""
  
  
  
    if(isCreated){
        toogleLoader(true)
        axios.post("https://tarmeezacademy.com/api/v1/posts",formData , {
            headers:{
              "authorization": `Bearer ${localStorage.getItem("token")}`
  
            }
          })
          .then((respone) => {
            showsuccess("new post created" , "success")
            getPosts()
            getPostUser()
            getUser()
            const modal = document.getElementById("creatPostModal")
            const modal1 = bootstrap.Modal.getInstance(modal)
            modal1.hide()
          })
          .catch((error) => {
            showsuccess(error.response.data.message,"danger")
          })
          .finally(() => {
            toogleLoader(false)
          })
          const modal = document.getElementById("creatPostModal")
          const modal1 = bootstrap.Modal.getInstance(modal)
          modal1.hide()
  
  
    }
    else {
        formData.append("_method","put")
        toogleLoader(true)
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`,formData , {
            headers:{
              "authorization": `Bearer ${localStorage.getItem("token")}`
  
            }
          })    
          .then((respone) => {
            showsuccess(" post Edit" , "success")
            getPosts()
            getPostUser()
            const modal = document.getElementById("creatPostModal")
            const modal1 = bootstrap.Modal.getInstance(modal)
            modal1.hide()
          })
          .catch((error) => {
            showsuccess(error.response.data.message,"danger")
          })
          .finally(() => {
            toogleLoader(false)
          })
          const modal = document.getElementById("creatPostModal")
          const modal1 = bootstrap.Modal.getInstance(modal)
          modal1.hide()
         
  
    }
    
  
  
  
  } 
  






function showsuccess(message,type) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }


      appendAlert(message, type)
      // const alert = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
      // setTimeout(() =>{
      //   alert.close()
      // } , 2500)
}

function RigesterBt(){

    const profileimg = document.getElementById("Profile-Image").files[0]           
    const name = document.getElementById("name").value
    const username = document.getElementById("Username1").value
    const Password = document.getElementById("password1").value

    let formData = new FormData()
    formData.append("name" , name)
    formData.append("username",username )
    formData.append("image",profileimg)
    formData.append("password",Password)
    toogleLoader(true)
    axios.post("https://tarmeezacademy.com/api/v1/register", formData )                 
    .then((respone) => {
      console.log(respone.data)
        localStorage.setItem("token",respone.data.token)
        localStorage.setItem("user", JSON.stringify(respone.data.user))
        swap()
        showsuccess("Nice, Rigester Successfuly!","success")
    })
    .catch((error) => {
        showsuccess(error.response.data.message,"danger")
      })
      .finally(() =>{
        toogleLoader(false)
      })
    const modal = document.getElementById("RigesterModal")
    const modal1 = bootstrap.Modal.getInstance(modal)
    modal1.hide()
    console.log(username,Password,name)

}


function loginBt(){
    const username = document.getElementById("Username").value
    const Password = document.getElementById("password").value
    toogleLoader(true)
    axios.post("https://tarmeezacademy.com/api/v1/login", 
    {
        "username" : username,
        "password" : Password
    })
    .then((respone) => {
        localStorage.setItem("token",respone.data.token)
        localStorage.setItem("user", JSON.stringify(respone.data.user))
        swap()
        showsuccess("Nice, Login Successfuly!","success")
    })
    .catch((error) => {
        showsuccess(error.response.data.message,"danger")
      })
      .finally(() =>{
        toogleLoader(false)
      })
    const modal = document.getElementById("LoginModal")
    const modal1 = bootstrap.Modal.getInstance(modal)
    modal1.hide()
    console.log(username,Password)

}

function logoutfunction(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    swap()  
    showsuccess("Nice,Logout Successfuly!","success")       
  }



  function swap(){
    const token = localStorage.getItem("token")
    if (token == null) {
        // document.getElementById("addComments").style.display="none"
        document.getElementById("profile-content").style.display="none"
        document.getElementById("login").style.display="block"
        document.getElementById("register").style.display="block"
        document.getElementById("logoutbt").style.display="none"
        document.getElementById("creatPost").style.display="none"
    }
    else {
        // document.getElementById("addComments").style.display="block"
        document.getElementById("profile-content").style.display="block"
        document.getElementById("login").style.display="none"
        document.getElementById("register").style.display="none"
        document.getElementById("logoutbt").style.display="block"
        document.getElementById("creatPost").style.display="block"
        const user = getcurrentUser()
        document.getElementById("nav-username").innerHTML=user.username
        document.getElementById("profile-img").src=user.profile_image


    }
}




function getcurrentUser(){
    let user = null
    const storage = localStorage.getItem("user")
        if(storage != null)
        {
            user = JSON.parse(storage)
        }
        return user
    }
    


    function toogleLoader(show=true){
        if(show){
          document.getElementById("loader").style.visibility='visible'
        }
        else{
          document.getElementById("loader").style.visibility='hidden'
      
        }
      
      }