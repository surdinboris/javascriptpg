function handleAction(state, action) {
    //console.log(state)
  if (action.type == "setUser") {
    localStorage.setItem("userName", action.user);
    return Object.assign({}, state, {user: action.user});
  } else if (action.type == "setTalks") {
      //this is talks collection

      return Object.assign({}, state, {talks: action.talks});

  } else if (action.type == "newTalk") {
    fetchOK(talkURL(action.title), {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        presenter: state.user,
        summary: action.summary
      })
    }).catch(reportError);
  } else if (action.type == "deleteTalk") {
    fetchOK(talkURL(action.talk), {method: "DELETE"})
      .catch(reportError);
  } else if (action.type == "newComment") {
    fetchOK(talkURL(action.talk) + "/comments", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        author: state.user,
        message: action.message
      })
    }).catch(reportError);
  }
  return state;
}

function fetchOK(url, options) {
  return fetch(url, options).then(response => {
    if (response.status < 400) return response;
    else throw new Error(response.statusText);
  });
}

function talkURL(title) {
  return "talks/" + encodeURIComponent(title);
}

function reportError(error) {
  alert(String(error));
}

function renderUserField(name, dispatch) {
  return elt("label", {}, "Your name: ", elt("input", {
    type: "text",
    value: name,
    onchange(event) {
      dispatch({type: "setUser", user: event.target.value});
    }
  }));
}

function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

function renderTalk(talk, dispatch) {
  return elt(
    "section", {className: "talk", id:talk.title},
    elt("h2", null, talk.title, " ", elt("button", {
      type: "button",
      onclick() {
        dispatch({type: "deleteTalk", talk: talk.title});
      }
    }, "Delete")),
    elt("div", null, "by ",
        elt("strong", null, talk.presenter)),
      elt("p", null, talk.summary),
      elt("div", {className:"comments"}, "comments: ",
    ...talk.comments.map(renderComment)),
    elt("form", {
      onsubmit(event) {
        event.preventDefault();
        let form = event.target;
        dispatch({type: "newComment",
                  talk: talk.title,
                  message: form.elements.comment.value});
        form.reset();
      }
    }, elt("input", {type: "text", name: "comment",
        onkeydown(e){
            localStorage.setItem("comment",e.target.value);
            //alert('changed'+e.target.value)
            }}), " ",
       elt("button", {type: "submit"}, "Add comment")));
}

function renderComment(comment) {
  return elt("p", {className: "comment"},
             elt("strong", null, comment.author),
             ": ", comment.message);
}

function renderTalkForm(dispatch) {
  let title = elt("input", {type: "text"});
  let summary = elt("input", {type: "text"});
  return elt("form", {
    onsubmit(event) {
      event.preventDefault();
      dispatch({type: "newTalk",
                title: title.value,
                summary: summary.value});

      event.target.reset();
    }
  }, elt("h3", null, "Submit a Talk"),
     elt("label", null, "Title: ", title),
     elt("label", null, "Summary: ", summary),
     elt("button", {type: "submit"}, "Submit"));
}

async function pollTalks(update) {
  let tag = undefined;
  //tag will be sent to a server that descides to send updated data or not
  for (;;) {
    let response;
    try {
      response = await fetchOK("/talks", {
        headers: tag && {"If-None-Match": tag,
                         "Prefer": "wait=90"}
      });
    } catch (e) {
      console.log("Request failed: " + e);
      await new Promise(resolve => setTimeout(resolve, 500));
      continue;
    }
    if (response.status == 304) continue;
    tag = response.headers.get("ETag");
    update(await response.json());
    //document.getElementsByName("comment")[0].value=localStorage.getItem("comment")
  }
}
class SkillShareApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch;
    this.talkDOM = elt("div", {className: "talks"});
    this.dom = elt("div", null,
                   renderUserField(state.user, dispatch),
                   this.talkDOM,
                   renderTalkForm(dispatch));
    this.syncState(state);
  }
  syncState(state) {
          /////// this.talkDOM.textContent = "";
      //detecting difference
  if (this.talks) {

      if (state.talks != this.talks) {
          //1. Making arrivedtalk components under the talk titles
              this.arrivedTalks = {};
              for (let talk of state.talks) {
                  this.arrivedTalks[talk.title] = talk
              }
          //Making current talk components object under the talk titles
          this.currentTalks = {};
          for (let talk of this.talks) {
              this.currentTalks[talk.title] = talk
          }
          //appending
          for (let arrTalk of Object.keys(this.arrivedTalks)) {
              let arrTitle = this.arrivedTalks[arrTalk].title;
              //checking if arrived task's title already present in dom's state
              if (this.currentTalks[arrTitle]) {
                  //verifying if this presented talk has all arrived comments
                  console.log('talk already present but lets check comments', arrTitle);
                  if (this.arrivedTalks[arrTitle].comments.length > this.currentTalks[arrTitle].comments.length) {
                      console.log('replacing comments', this.arrivedTalks[arrTitle].comments.length, this.currentTalks[arrTitle].comments.length)
                      //removing talk
                      let toBecommentsUpd = document.getElementById(arrTitle);
                      for (let c = 0; c < toBecommentsUpd.getElementsByClassName('comment').length; c++) {
                          toBecommentsUpd.getElementsByClassName('comment')[c].textContent = "";
                      }
                      this.arrivedTalks[arrTitle].comments.forEach(comm=>toBecommentsUpd.getElementsByClassName("comments")[0].appendChild(renderComment(comm)))

                  }
                  //console.log('resComments',resComments)
              }
              else {
                  console.log('new talk arrived', arrTitle);
                  //appending to DOM without any checks
                  this.talkDOM.appendChild(
                      renderTalk(this.arrivedTalks[arrTalk], this.dispatch))
              }
          }
          //remooving iterating over current talks
          for (let currTalk of Object.keys(this.currentTalks)) {
              let currTitle = this.currentTalks[currTalk].title;
              if (!this.arrivedTalks[currTitle]) {
                  console.log('removed', currTitle);
                  let toBeremoved = document.getElementById(currTitle);
                  this.talkDOM.removeChild(toBeremoved)
              }
          }
      }
  }
  //in case of first run(this.taks empty) executing fast DOM rendering
  else{
      console.log('first run populating');
    for (let talk of state.talks) {
        //appending to DOM
        this.talkDOM.appendChild(
            renderTalk(talk, this.dispatch));
    }
  }
  this.talks = state.talks

  }
};

function runApp() {
  let user = localStorage.getItem("userName") || "Anon";
  let state, app;
  function dispatch(action) {
    state = handleAction(state, action);
    app.syncState(state);
  }
//refresing function
  pollTalks(talks => {
    if (!app) {
      state = {user, talks};
      app = new SkillShareApp(state, dispatch);
      //appending new DOM
      document.body.appendChild(app.dom);
    } else {
      dispatch({type: "setTalks", talks});
    }
  }).catch(reportError);
}

runApp();
