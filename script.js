var siteName=document.getElementById("siteName")
var siteUrl=document.getElementById("siteUrl")
var tableRow=document.getElementById("tableRow")
var mainBtn=document.getElementById("mainBtn")
var siteArr;
var alertName=document.getElementById("alertName")
var alertUrl=document.getElementById("alertUrl");
var alertExite=document.getElementById("alertExite");
(function () {
    if (localStorage.getItem("data") == null) siteArr = [];
    else {
      siteArr = JSON.parse(localStorage.getItem("data"));
      display(siteArr);
    }
  })();
  mainBtn.onclick = function () {
    if (mainBtn.innerHTML == "update") finalUpdate();
    else addBookmark();
  };
  
  function addBookmark() {
    if(nameRegex() == true & urlRegex()==true){
        var BookObj = {
        sName: siteName.value,
        sUrl: siteUrl.value,
      };
      siteArr.push(BookObj);
      localStorage.setItem("data", JSON.stringify(siteArr));
      display(siteArr);
      clearForm()
    }
    }
  
  function display(arr) {
    var box = "";
    for (var i = 0; i < arr.length; i++) {
      box += `
      <tr>
      <td>${arr[i].sName}</td>
      <td  class="small max-w text-truncate">${arr[i].sUrl}</td>
      <td><button class="btn btn-danger" onclick="deleteFun(${i})">delete</button>
      <button class="btn btn-info" onclick="updateFun(${i})">update</button>
      <a href="${arr[i].sUrl}" target="_blank" class="btn btn-warning" onclick="visite(${i})" id="visite">visite</a>
        </td>
      </tr>
      `;
    }
    tableRow.innerHTML = box;
  }
  
  function deleteFun(index) {
    siteArr.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(siteArr));
    display(siteArr);
  }
  
  function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
  }
  

  var globalIndex;
  function updateFun(index) {
    globalIndex = index;
    siteName.value = siteArr[index].sName;
    siteUrl.value = siteArr[index].sUrl;
    mainBtn.innerHTML = "update";
  }
  
  function finalUpdate() {
    siteArr[globalIndex].sName = siteName.value;
    siteArr[globalIndex].sUrl = siteUrl.value;
    mainBtn.innerHTML = "Add Bookmark";
    localStorage.setItem("data", JSON.stringify(siteArr));
    display(siteArr);
    clearForm()
  }
  
  function search(term) {
    var searchedArr = [];
    for (var i = 0; i < siteArr.length; i++) {
      if (siteArr[i].sName.toLowerCase().includes(term.toLowerCase())) {
        searchedArr.push(siteArr[i]);
      }
    }
    display(searchedArr);
  }

function nameRegex() 
{
    if(siteName.value ==""){
       
        alertName.classList.remove("d-none") ;
        return false;    
    }
    else
    {
        var exite=false;

        for (var i = 0; i < siteArr.length; i++) 
        {
            if (siteArr[i].sName.toLowerCase() == siteName.value.toLowerCase())
            {
                exite=true;
                break;
            }
        }

        if(exite==true)
        {
            alertExite.classList.remove("d-none")
        }
        else{
            alertExite.classList.add("d-none")
            return true
        }
        alertName.classList.add("d-none") ; 
       
          
    }   
}

function urlRegex(){
    if(siteUrl.value==""){
        alertUrl.classList.remove("d-none") ;
        return false;    
    }else{
    alertUrl.classList.add("d-none") ; 
    return true
}  
}














