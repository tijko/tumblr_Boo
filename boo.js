//tumblr_Boo --> blocks all tumblr posts you don't want showing on your dashboard.
// this my first small program with javascript, so edits and tips from forks welcome :)
//


var tumblr_boo = function() {
    post_ctrls = document.getElementsByClassName("post_controls");
    for (i=0; i<post_ctrls.length; i++) {
        boo = document.createElement("a");
        boo.className = "post_control Boo!";
        boo.innerText +=  "Boo!";
        boo.href = '#';
        boo.onclick = function() {
            post_div = this.parentNode;
            post = post_div.parentNode;
            boo_key = post.parentNode.getAttribute("data-reblog-key");
            localStorage[boo_key] = "Booed";
            blk_post(post_div); 
            post_chk();
        }
        post_ctrls[i].appendChild(boo);
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
    boo_post.parentNode.style.display = "none";
}

var show_post = function(post) {
    post_wrapper = post.parentNode;
    post_list = post_wrapper.parentNode;
    post_wrapper.nextSibling.style.display = "";
    chk_boo = post_wrapper.nextSibling.getAttribute("data-reblog-key");
    post_wraps = post_list.getElementsByClassName("post_wrapper");
    for (i=0; i<post_wraps.length; i++) {
        chk = post_wraps[i].parentNode;
        post_id = chk.getAttribute("data-reblog-key");
        if (chk_boo == post_id) {
            chk.style.display = "";
            post_list.removeChild(chk.previousSibling);
        };
    };
    if (localStorage[chk_boo]) {
        delete localStorage[chk_boo];
    };
    post_list.removeChild(post_wrapper);
}

var post_chk = function() {
    post_ctrls = document.getElementsByClassName("post_controls");
    for (i=0; i<post_ctrls.length; i++) {
        blk_chk = post_ctrls[i].parentNode;
        boo_chk = blk_chk.parentNode;
        if (localStorage[boo_chk.getAttribute("data-reblog-key")] && boo_chk.style.display != "none") {
            ctrl_div = blk_chk.getElementsByClassName("post_controls");
            blk_post(ctrl_div[0]);
        }
    };
}

tumblr_boo();

