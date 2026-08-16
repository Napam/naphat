(()=>{document.querySelectorAll("form[data-confirm]").forEach((e)=>{e.addEventListener("submit",(t)=>{if(!window.confirm(e.dataset.confirm))t.preventDefault()})});})();
