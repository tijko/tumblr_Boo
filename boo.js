//tumblr_Boo --> blocks all tumblr posts you don't want showing on your dashboard.
// this my first small program with javascript, so edits and tips from forks welcome :)
//


var post_chk = function() {
    posts = document.getElementsByClassName("post_wrapper");
    for (i=0; i<posts.length; i++) {
        blk_chk = posts[i].parentNode;
        if (localStorage[blk_chk.getAttribute("data-reblog-key")] && blk_chk.style.display != "none") {
            blk_post(posts[i]);
        }
    };
}

var tumblr_boo = function() {
    post_ctrls = document.getElementsByClassName("post_controls_inner");
    post_ids = document.getElementsByClassName("post_wrapper");
    for (i=0; i<post_ctrls.length; i++) {
        boo_cls = post_ctrls[i].getElementsByClassName("boo_post_control");
        if (boo_cls.length < 1) {
            boo = document.createElement("div");
            boo.className = "boo_post_control";
            boo.title = "Block";
            boo.id = post_ids[i].parentNode.getAttribute("data-reblog-key");
            post_id = post_ids[i].parentNode.getAttribute("data-post-id");
            boo.setAttribute("post", post_id);
            boo.onclick = function() {
                posts = document.getElementsByClassName("post_wrapper");
                for (i=0; i<posts.length; i++) {
                    if (this.id === posts[i].parentNode.getAttribute("data-reblog-key")) {
                        booed_id = this.getAttribute("post");
                        blk_post(posts[i], booed_id);
                        localStorage[this.id] = "Booed";
                    }
                }
                post_chk();
            }
            post_ctrls[i].appendChild(boo);
        };
    };
    post_chk();
}

var blk_post = function(post, post_id) {
    boo_post = post.parentNode;
    boo_post_id = boo_post.getAttribute("data-post-id");
    blk_li = document.createElement("li");
    blk_li.className = "boo_post_li";

    blk_div = document.createElement("div");
    blk_div.className = "boo_post_div";
    blk_div.id = boo_post.getAttribute("data-reblog-key");
    blk_div.setAttribute("post", boo_post_id); 

    blk_msg = document.createElement("p");
    blk_msg.className = "boo_post_p";
    blk_msg.innerText += "This Post has been BOO'ed!";
    blk_msg.onclick = function() {
        blk_id = this.parentNode.getAttribute("post");
        show_post(this.parentNode, blk_id);
    }
    blk_div.appendChild(blk_msg);
    blk_li.appendChild(blk_div);

    post_position = document.getElementById("posts");
    post_position.insertBefore(blk_li, boo_post.parentNode);
    boo_post.style.display = "none";
    if (post_id === boo_post_id) {
        pos = blk_li.offsetTop;
        window.scrollTo(0, pos - 15);
    }
}

var show_post = function(post, blk_id) {
    posts = document.getElementsByClassName("post_wrapper");
    post_containers = document.getElementsByClassName("post_container");
    post_list = document.getElementById("posts");
    for (i=0; i<posts.length; i++) {
        post_check = posts[i].parentNode;
        if (post_check.getAttribute("data-reblog-key") === post.id) { 
            post_check.style.display = "";
            post_list.removeChild(post_check.parentNode.previousSibling);
            if (post_check.getAttribute("data-post-id") === blk_id) {
                pos = post_check.offsetTop;
                window.scrollTo(0, pos - 15);
            }
        };
    };
    if (localStorage[post.id]) {
        delete localStorage[post.id];
    };
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        tumblr_boo();
    }
};

tumblr_boo();    
