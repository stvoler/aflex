"use strict";document.querySelectorAll("main").forEach(t=>{const e=t.querySelectorAll(".product-tabs .item"),c=t.querySelectorAll(".product-tab");let a;e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(t=>{t.classList.remove("active")}),t.classList.add("active"),a=t.getAttribute("data-tab-index"),c.forEach(t=>{t.classList.contains(a)?t.classList.add("active"):t.classList.remove("active")})})})});