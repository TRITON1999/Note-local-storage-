const wrapper = $(".wrapper");
const note = JSON.parse(localStorage.getItem("note") || "[]");
const entryScreen = $(".entry-screen");
const title = $("input");
const description = $("textarea");
const plus = $(".plus");
const del = $(".delete");
const sav = $(".save");
entryScreen.slideUp();
let editing =false;
let num = 0;
gen(note);
function gen(elemen){
    elemen.forEach(function(n,index){
        wrapper.append(
        `<div class="card center ">
            <div id="${index}" class="container show">
                <div class="title">${n.title}</div>
                <hr>
                <div class="para">${n.description}</div>
            </div>
        </div>`
        );
});
//---- it will give a event lister to every entery card you will make ---
$(".show").click(function(e){
    editing = true;
    startTheEntryDispay();
    num = e.delegateTarget.id;
    console.log(note[num].title);
    title.val(note[num].title);
    description.val(note[num].description);
})
}

//------ it is function which will slide the those panel which contain our entry and slide the panel down in which we can put our entry-------

function startTheEntryDispay(){
    wrapper.slideUp();
    entryScreen.animate({opacity: "1"}).slideDown();
    entryScreen.css("visibility","visible");
}
function slide() {
    entryScreen.slideUp();
    wrapper.animate({opacity: "1"}).slideDown();
}
slide();

function load(){
        wrapper.slideUp();
        entryScreen.slideDown()
}

plus.click(function(){
    title.val("Title...");
    description.val("description...");
    startTheEntryDispay();
});
del.click(function(){
    
    if(editing){
        note.splice(num,1);
        localStorage.setItem("note",JSON.stringify(note));
        
        editing = false;
        alert("please refresh after clicking ok");
    }
    slide();
})

function settingValue (){
    slide();
    let notTitle = title.val(),notDes = description.val();
    let m={
        title:notTitle,description:notDes
    };
    if(editing){
        console.log(note[num]);
        note[num]=m;
        console.log(m);
        localStorage.setItem("note",JSON.stringify(note));
        alert("please refresh after clicking ok");
    }
    else{
    note.push(m);
    localStorage.setItem("note",JSON.stringify(note));
    gen([m]);
    }
    editing = false;
}

sav.click(settingValue);