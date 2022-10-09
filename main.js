(()=>{"use strict";var e=function(e,t,n){var r=n.inactiveButtonClass;!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r),t.removeAttribute("disabled")):(t.classList.add(r),t.setAttribute("disabled",!0))},t=document.querySelector(".popup__picture-image"),n=document.querySelector(".popup__picture-figcaption"),r=document.querySelector(".popup_picture"),o=document.querySelector(".popup_profile-edit"),u=o.querySelector(".popup_edit_form"),c=document.querySelector(".popup_avatar-edit"),i=c.querySelector(".popup_avatar_form");function a(e){e.classList.add("popup_opened"),document.addEventListener("keydown",s),e.addEventListener("mousedown",l)}var s=function(e){"Escape"===e.key&&d(document.querySelector(".popup_opened"))},l=function(e){e.target===e.currentTarget&&d(e.currentTarget)};function d(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",s),e.removeEventListener("mousedown",l)}var p={baseUrl:"https://nomoreparties.co/v1/plus-cohort-15",headers:{authorization:"50cb73c3-cd63-4207-b16a-8317dc26240b","Content-Type":"application/json"}};function m(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var f=function(){return fetch("".concat(p.baseUrl,"/cards"),{method:"GET",headers:p.headers}).then((function(e){return m(e)}))},_=function(e,t){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(t),{method:e,headers:p.headers}).then((function(e){return m(e)}))},v=document.querySelector("#element__template"),h=document.querySelector(".elements__list"),y=document.querySelector(".popup_add-picture"),b=y.querySelector(".popup_add_form"),S=b.querySelector('input[name="popup_input-title"]'),C=b.querySelector('input[name="popup_input-link"]'),q=document.querySelector(".popup__button-submit-picture"),E={id:""};function L(e,o,u,c,i,s){var l=v.content.querySelector(".elements__element").cloneNode(!0),d=l.querySelector(".elements__picture"),f=l.querySelector(".elements__like-number"),h=l.querySelector(".elements__delete"),y=l.querySelector(".elements__like");if(c!==E.id&&h.classList.add("elements_delete_disable"),h.addEventListener("click",(function(){var e=event.target.closest(".elements__element");(function(e){return fetch("".concat(p.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return m(e)}))})(i).then((function(t){e.remove()})).catch((function(e){console.error(e)}))})),d.src=o,d.alt=e,f.textContent=u,l.querySelector(".elements__name").textContent=e,void 0!==s)for(var b=0;b<s.length;b++)s[b]._id===E.id&&y.classList.add("elements_like_active");return y.addEventListener("click",(function(e){e.target.classList.contains("elements_like_active")?_("DELETE",i).then((function(t){e.target.classList.toggle("elements_like_active"),u-=1,f.textContent=u})).catch((function(e){console.error(e)})):_("PUT",i).then((function(t){e.target.classList.toggle("elements_like_active"),u+=1,f.textContent=u})).catch((function(e){console.error(e)}))})),d.addEventListener("click",(function(){return function(e,o){t.setAttribute("src",e),t.setAttribute("alt",o),n.textContent=o,a(r)}(o,e)})),l}var k,g,x,A,B,T,U,w=document.querySelector(".profile__name"),P=document.querySelector(".profile__description"),D=document.querySelector(".profile__avatar"),N=u.querySelector('input[name="popup_edit-input-name"]'),O=u.querySelector('input[name="popup_edit-input-description"]'),j=i.querySelector('input[name="popup_input-avatar"]'),J=document.querySelector(".profile__avatar"),M=document.querySelector(".popup__button-submit-avatar"),G=document.querySelector(".popup__button-submit-profile"),H=document.querySelector(".profile__edit-button"),I=document.querySelector(".profile__add-button"),V=document.querySelectorAll(".popup__close-button"),z=document.querySelector(".profile__avatar-button");H.addEventListener("click",(function(){a(o),N.value=w.textContent,O.value=P.textContent})),z.addEventListener("click",(function(){a(c)})),V.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return d(t)}))})),I.addEventListener("click",(function(){a(y)})),u.addEventListener("submit",(function(e){G.textContent="Сохранение...",e.preventDefault(),function(e,t){return fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return m(e)}))}(N.value,O.value).then((function(e){w.textContent=N.value,P.textContent=O.value,d(o)})).catch((function(e){console.error(e)})).finally((function(){G.textContent="Сохранить"}))})),b.addEventListener("submit",(function(e){var t,n;q.textContent="Сохранение...",e.preventDefault(),(t=S.value,n=C.value,fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return m(e)}))).then((function(e){h.prepend(L(e.name,e.link,e.likes.length,e.owner._id,e._id,e.likes)),d(y)})).catch((function(e){console.error(e)})).finally((function(){q.textContent="Создать"})),b.reset(),e.submitter.classList.add("popup_button-submit-disabled"),e.submitter.setAttribute("disabled",!0)})),i.addEventListener("submit",(function(e){var t;M.textContent="Сохранение...",e.preventDefault(),(t=j.value,fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:t})}).then((function(e){return m(e)}))).then((function(e){J.style.backgroundImage="url(".concat(j.value,")"),d(c)})).catch((function(e){console.error(e)})).finally((function(){G.textContent="Сохранить"}))})),g=(k={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup_button-submit-disabled",inputErrorClass:"form_input_type_error",errorClass:"form_input-error_active"}).formSelector,x=k.inputSelector,A=k.submitButtonSelector,B=k.inactiveButtonClass,T=k.inputErrorClass,U=k.errorClass,Array.from(document.querySelectorAll(g)).forEach((function(t){!function(t,n){var r=n.inputSelector,o=n.submitButtonSelector,u=n.inactiveButtonClass,c=n.inputErrorClass,i=n.errorClass,a=Array.from(t.querySelectorAll(r)),s=t.querySelector(o);e(a,s,{inactiveButtonClass:u}),a.forEach((function(n){n.addEventListener("input",(function(){!function(e,t,n){var r=n.inputErrorClass,o=n.errorClass;t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=n.inputErrorClass,o=n.errorClass,u=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),u.classList.remove(o),u.textContent=""}(e,t,{inputErrorClass:r,errorClass:o}):function(e,t,n,r){var o=r.inputErrorClass,u=r.errorClass,c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(u)}(e,t,t.validationMessage,{inputErrorClass:r,errorClass:o})}(t,n,{inputErrorClass:c,errorClass:i}),e(a,s,{inactiveButtonClass:u})}))}))}(t,{inputSelector:x,submitButtonSelector:A,inactiveButtonClass:B,inputErrorClass:T,errorClass:U})})),Promise.all([fetch("".concat(p.baseUrl,"/users/me"),{method:"GET",headers:p.headers}).then((function(e){return m(e)})),f()]).then((function(e){w.textContent=e[0].name,P.textContent=e[0].about,D.style.backgroundImage="url(".concat(e[0].avatar,")"),E.id=e[0]._id,e[1],f().then((function(e){e.forEach((function(e){h.append(L(e.name,e.link,e.likes.length,e.owner._id,e._id,e.likes))}))})).catch((function(e){console.error(e)}))})).catch((function(e){console.log(e)}))})();