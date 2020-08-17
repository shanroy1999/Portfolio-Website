window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function(){
        document.querySelector(".preloader").style.display="none";
    }, 1000)
})

const filterContainer=document.querySelector(".portfolio-filter"),
      filterBtns=filterContainer.children,
      totalFilterBtns = filterBtns.length,
      portfolioItems = document.querySelectorAll(".portfolio-item"),
      totalPortfolioItems = portfolioItems.length;

      for(let i=0; i<totalFilterBtns; i++){
        filterBtns[i].addEventListener("click", function(){
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const filterValue=this.getAttribute("data-filter");
            for(let k=0; k<totalPortfolioItems; k++){
                if(filterValue === portfolioItems[k].getAttribute("data-category")){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
                else{
                    portfolioItems[k].classList.remove("show");
                    portfolioItems[k].classList.add("hide");
                }
                if(filterValue==="All"){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
            }
        });
      }


    const lightbox = document.querySelector(".lightbox"),
          lightboxImg = lightbox.querySelector(".lightbox-img"),
          lightboxClose = lightbox.querySelector(".lightbox-close"),
          lightboxText = lightbox.querySelector(".caption-text"),
          lightboxCounter = lightbox.querySelector(".caption-counter");

    let itemIndex = 0;

    for(let i=0; i<totalPortfolioItems; i++){
        portfolioItems[i].addEventListener("click", function(){
            itemIndex = i;
            changeItem();
            toggleLightbox();
        })
    }

    function changeItem(){
        imgsrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
        lightboxImg.src = imgsrc;
        lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
        lightboxCounter.innerHTML = (itemIndex+1) + " of " + totalPortfolioItems;
    }

    function toggleLightbox(){
        lightbox.classList.toggle("open");
    }

    function nextItem(){
        if(itemIndex === totalPortfolioItems-1){
            itemIndex = 0;
        }
        else{
            itemIndex++;
        }
        changeItem();
    }

    function prevItem(){
        if(itemIndex === 0){
            itemIndex = totalPortfolioItems-1;
        }
        else{
            itemIndex--;
        }
        changeItem();
    }

    lightbox.addEventListener("click", function(event){
        if(event.target === lightboxClose || event.target === lightbox){
            toggleLightbox();
        }
    })

    const nav = document.querySelector(".nav"),
          navlist = nav.querySelectorAll("li"),
          totalNavList = navlist.length,
          allSection = document.querySelectorAll(".section"),
          totalSection = allSection.length;

    for(let i=0; i<totalNavList; i++){
        const a = navlist[i].querySelector("a");
        a.addEventListener("click", function(){

            removePrevSectionClass();

            for(let j=0; j<totalNavList; j++){
                if(navlist[j].querySelector("a").classList.contains("active")){
                    addPrevSectionClass(j);
                }
                navlist[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active");
            showSection(this);

            if(window.innerWidth < 1200){
                asideSectionTogglerBtn();
            }
        })
    }

    function showSection(element){
        for(let i=0; i<totalSection; i++){
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#"+target).classList.add("active");
    }

    function removePrevSectionClass(){
        for(let i=0; i<totalSection; i++){
            allSection[i].classList.remove("prev-section");
        }
    }

    function addPrevSectionClass(num){
        allSection[num].classList.add("prev-section");
    }

    const navTogglerBtn = document.querySelector(".nav-toggler"),
          aside = document.querySelector(".aside");

    navTogglerBtn.addEventListener("click", function(){
        asideSectionTogglerBtn();
    })

    function asideSectionTogglerBtn(){
        aside.classList.toggle("open");
        navTogglerBtn.classList.toggle("open");
        for(let i=0; i<totalSection; i++){
            allSection[i].classList.toggle("open");
        }
    }

    document.querySelector(".hire-me").addEventListener("click", function(){
        const sectionIndex = this.getAttribute("data-section-index");
        showSection(this);
        updateNav(this);
        removePrevSectionClass();
        addPrevSectionClass(sectionIndex);
    })

    function updateNav(element){
        for(let i=0; i<totalNavList; i++){
            navlist[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navlist[i].querySelector("a").getAttribute("href").split("#")[1]){
                navlist[i].querySelector("a").classList.add("active");
            }
        }
    }
