// login 
document.getElementById("login-btn").addEventListener("click",(event)=>{
    event.preventDefault();
    const userName=document.getElementById("user-name").value;
    console.log(typeof userName);
    const password=document.getElementById("password").value;
    console.log(typeof password);
    if(!userName && !password){
       
       Swal.fire({
        icon: "error",
        title: "Give UserName and Code",
        text: "Please enter your name and valid code",
      });

    }else if(userName && !password || password!=='123456'){
        Swal.fire({
            icon: "error",
            title: "Password Does't Matching",
            text: "Wrong password.Contact admin to get your Login Code",
          });
    }else if(!userName && password==='123456'){
        Swal.fire({
            icon: "error",
            title: "Give UserName",
            text: "Please enter your name first",
          });
    }else if (userName && password === "123456") {
        Swal.fire({
          icon: "success",
          title: "অভিনন্দন!",
          text: "চলুন আজ নতুন কিছু শিখা যাক",
        })
          const logins = document.getElementsByClassName("login");
          const logout = document.getElementById("logout");
    
          logout.classList.add("opacity-0", "transition-opacity", "duration-300");
          setTimeout(() => {
            logout.classList.add("hidden");
          }, 100);
    
          for (let login of logins) {
            login.classList.remove("hidden");
            login.classList.add("opacity-0");
            setTimeout(() => {
              login.classList.add("opacity-100", "transition-opacity", "duration-500");
            }, 50);
          }

      }
})


// logout 

document.getElementById("logout-btn").addEventListener("click", (event) => {
    event.preventDefault();
  
    const logins = document.getElementsByClassName("login");
    const logout = document.getElementById("logout");
  
    for (let login of logins) {
      login.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => {
        login.classList.add("hidden");
      }, 100);
    }
  
    setTimeout(() => {
      logout.classList.remove("hidden");
      logout.classList.add("opacity-0"); 
      setTimeout(() => {
        logout.classList.add("opacity-100", "transition-opacity", "duration-300");
      }, 50);
    }, 100);

  });
  


// smooth scroll 
document.addEventListener("DOMContentLoaded", ()=> {
   
    function smoothScroll(targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const headerHeight = document.getElementById("header").offsetHeight;
        const sectionTop = targetSection.offsetTop - headerHeight-52;
        setTimeout(() => {
            window.scrollTo({
              top: sectionTop,
              behavior: "smooth",
            });
          }, 50);
      }
    }
   
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault(); 
        const targetId = this.getAttribute("href").substring(1);
        console.log(targetId); 
        smoothScroll(targetId);
      });
    });

  });
  