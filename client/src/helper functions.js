import axios from "axios";

// export const HandleSwipe = (el, cb) => {
//     const xDown, yDown, xUp, yUp, xDiff, yDiff;
//     el.addEventLister(touchStart, (e) => {
//         xDown = e.touches[0].clientX;
//         yDown = e.touches[0].clientY;
//     })
//     el.addEventLister(touchMove, (e) => {
//         xUp = e.touches[0].clientX;
//         yUp = e.touches[0].clientY;
//         xDiff = xUp - xDown;
//         yDiff = yUp - yDown;
//         if(Math.abs(xDiff) > Math.abs(yDiff)) {
//             if(xDiff > 0) {
//                 // cb for right swipe
//             } else {
//                 // cb for left swipe
//             }

//         }   // i only need to listen for left and right swipe
//         //  else if(Math.abs(yDiff) > Math.abs(xDiff)) {
//         //     if(yDiff > 0) {
//         //         // cb for up swipde
//         //     }
//         //     else {
//         //         // cb for down swipe
//         //     }
//         // }
//     })
// }

export const HandleLabelPosition = (e) => {
    const {target, target:{value}} = e
    if(e.type === "focus") {
        target.previousSibling.classList.add("input-focus-label")
    } else if(e.type === "blur") {
        if(value.length < 1) {
            target.previousSibling.classList.remove("input-focus-label")
        }
        
    }
}

export const checkUsernameExistence = (username) => {
    return axios.post("api/action/checkUsernameExistence", {username}) 
}