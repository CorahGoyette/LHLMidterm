const myCategoriesList = $("#my-categories-list");

const displayAndMakeBackButton = (res) => {
  let output = "";
  for (let resource of res) {
    output += generateResources(resource)
  }
  $(".show-all-resources").hide();
  $(".show-categories").hide();
  myCategoriesList.html(output);
  $("#my-resources h3:eq(0)").after(`<button class=back-button><a href="/home" style="color:black">Show Categories</a></button>`)
}

// Clicking on a category calls the db and gets a list of resources belonging to that category,
// And displays back buttom
const clickCategory = (data) => {
  myCategoriesList.off();
  clickedCategory = data.currentTarget.children[1].children[0].innerHTML
  if (clickedCategory === "Liked") {
    ajaxLikedResources().then(res => {
      displayAndMakeBackButton(res);
    })
  } else {
    ajaxCategoryResources(clickedCategory).then(res => {
      displayAndMakeBackButton(res);
    })
  }
}

const usersLikes = ajaxUsersLikes()
// Display Categories and Show All/Show Categories Buttons
ajaxCategories().then(res => {
  // console.log("in first action");
  let output = "";
  // console.log(res);
  for (let cat of res) {
    output += generateTemplateCategory(cat.category);
  }
  $("#my-resources h3:eq(0)").after(`<button class="show-all-resources">Show All</button><button class="show-categories">Show Categories</button>`);


  $(".show-categories").hide();
  myCategoriesList.html(output);
  myCategoriesList.append(generateTemplateCategory("Liked"))
  $(".my-categories").on("click",(data) => {
    clickCategory(data);
  })
});


// On click For Show all Resources Button
$("#my-resources").on("click", ".show-all-resources", (data) => {
  $(".show-all-resources").hide();
  $(".show-categories").show();
  ajaxAllResources().then(res => {
    console.log(res);
    let output = ""
    for (resource of res.myResources) {
      console.log(typeof resource);
      resource.isLiked = usersLikes.responseJSON.map(users => {
        if(users.resource_id === resource.id) {
          return "true"
        } else {
          return "false"
        }
      }).includes("true");
      console.log(resource);

      if (resource.user_id !== res.ID) {
        output += generateResources(resource, "red")
      } else {
        output += generateResources(resource)
      }
    }
    myCategoriesList.html(output);
  })
})

// On click For Show Categories Button
$("#my-resources").on("click", ".show-categories", (data) => {
  $(".show-categories").hide();
  $(".show-all-resources").show();
  ajaxCategories().then(res => {
  let output = "";
  // console.log(res);
  for (let cat of res) {
    output += generateTemplateCategory(cat.category);
  }
    myCategoriesList.html(output);
    myCategoriesList.append(generateTemplateCategory("Liked"))
    $(".my-categories").on("click",(data) => {
    clickCategory(data);
    })
  })
})
$(".container").on("click",".like-button",(data) => {
  const id = data.originalEvent.path[3].id;
  const clickStatus = data.originalEvent.path[0].attributes[1].value;
  if (clickStatus === "false") {
    $("#my-resources .like-button").attr("data-cond","true");
    $("#my-resources .like-count").css({"color":"red"})
    ajaxAddLike(id).then(res => {
      // console.log(res);
    })

  } else {
    $(".container .like-button").attr("data-cond","false");
    $(".container .like-count").css({"color":"black"})
    ajaxDeleteLike(id).then(res => {

    })
  }
})

