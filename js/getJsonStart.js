        document.addEventListener("DOMContentLoaded", hentJson);


        let retter;
        async function hentJson() {
            let jsonData = await fetch("menu.json");
            retter = await jsonData.json();
            visRetter(retter);
        }

        function visRetter(retter) {
            let temp = document.querySelector(".menutemplate");
            let dest = document.querySelector(".liste");
            retter.forEach(ret => {
                let klon = temp.cloneNode(true).content;
                klon.querySelector(".navn").textContent = ret.navn;
                klon.querySelector(".pris").textContent = ret.pris;
                klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
                klon.querySelector(".langbeskrivelse").textContent = ret.langbeskrivelse;
                klon.querySelector(".oprindelsesregion").textContent = ret.oprindelsesregion;
                klon.querySelector(".billede").src = ret.billede;
                klon.querySelector(".billede").alt = "billede af" + ret.navn;
                dest.appendChild(klon);
            });
        };
