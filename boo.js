//tumblr_Boo --> blocks all tumblr posts you don't want showing on your dashboard.
// this my first small program with javascript, so edits and tips from forks welcome :)
//


var tumblr_boo = function() {
    post_ctrls = document.getElementsByClassName("post_controls_inner");
    post_ids = document.getElementsByClassName("post_wrapper");
    for (i=0; i<post_ctrls.length; i++) {
        boo_cls = post_ctrls[i].getElementsByClassName("post_control Boo!");
        if (boo_cls.length < 1) {
            boo = document.createElement("a");
            boo.title = "Block";
            boo.className = "post_control Boo!";
            boo.innerText +=  "Boo!";
            boo.href = 'javascript:';
            boo.id = post_ids[i].parentNode.getAttribute("data-reblog-key");
            boo.onclick = function() {
                posts = document.getElementsByClassName("post_wrapper");
                for (i=0; i<posts.length; i++) {
                    if (this.id === posts[i].parentNode.getAttribute("data-reblog-key")) {
                        blk_post(posts[i]);
                    }
                }
                localStorage[this.id] = "Booed";
                post_chk();
            }
            post_ctrls[i].appendChild(boo);
        };
    };
    post_chk();
}

var blk_post = function(post) {
    boo_post = post.parentNode;
    blk_li = document.createElement("li");
    blk_li.style.boxShadow = "3px 3px 3px black";
    blk_li.className = "blocked_post_li";

    blk_div = document.createElement("div");
    blk_div.className = "blocked_post_div";
    blk_div.id = boo_post.getAttribute("data-reblog-key");
    blk_div.style.border = "1px";
    blk_div.style.height = "45px";
    blk_div.style.textAlign = "center";
    blk_div.style.backgroundColor = "#335577";
    blk_div.style.margin = "20px 0 20px 0";
    blk_div.style.borderRadius = "5px";
    blk_div.style.color = "#aaaaaa";

    unblk_btn = document.createElement("button");
    unblk_btn.style.cssFloat = "left";
    unblk_btn.onclick = function() {
        show_post(this.parentNode);
    }
    blk_div.appendChild(unblk_btn);

    blk_msg = document.createElement("p");
    blk_msg.innerText += "This Post has been BOO'ed!";
    blk_msg.style.color = "#aaaaaa";
    blk_msg.style.fontStyle = "italic";
    blk_msg.style.fontFamily = "Verdana";
    blk_msg.style.paddingTop = "10px";
    blk_div.appendChild(blk_msg);

    blk_li.appendChild(blk_div);

    spot = document.getElementById("posts");
    spot.insertBefore(blk_li, boo_post.parentNode);
    boo_post.style.display = "none";
}

var show_post = function(post) {
    posts = document.getElementsByClassName("post_wrapper");
    post_containers = document.getElementsByClassName("post_container");
    post_list = document.getElementById("posts");
    for (i=0; i<posts.length; i++) {
        post_chk = posts[i].parentNode;
        if (post_chk.getAttribute("data-reblog-key") === post.id) { 
            post_chk.style.display = "";
            post_list.removeChild(post_chk.parentNode.previousSibling);
            
        };
    };
    if (localStorage[post.id]) {
        delete localStorage[post.id];
    };
}

var post_chk = function() {
    posts = document.getElementsByClassName("post_wrapper"); 
    for (i=0; i<posts.length; i++) {
        blk_chk = posts[i].parentNode;
        if (localStorage[blk_chk.getAttribute("data-reblog-key")] && blk_chk.style.display != "none") { 
            blk_post(posts[i]);
        }
    };
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        tumblr_boo();
    }
};

tumblr_boo();    
