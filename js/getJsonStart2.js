        document.addEventListener("DOMContentLoaded", hentJson);


        let retter;
        async function hentJson() {
            //vent på at den har hentet dataen i json-dokumentet
            let jsonData = await fetch("menu.json");
            retter = await jsonData.json();
            //starter både menu-templaten og menu-filtrering
            visRetter(retter, "Menu");
            lavFiltre();
        }

        function visRetter(retter, overskrift) {
            let menuTemplate = document.querySelector("[data-template]");
            let templateModtager = document.querySelector("[data-container]");
            //sletter templatens indhold, inden den indsætter det man trykker på, så templatemodtager bliver fyldt med  ingenting, inden den bliver fyldt med indholdet fra den knap man trykker på (hhv desserter, forretter etc.
            templateModtager.innerHTML = "";
            document.querySelector("#overskift").textContent = overskrift;
            retter.forEach(ret => {
                //kloner templaten
                let klon = menuTemplate.cloneNode(true).content;
                klon.querySelector("[data-navn]").textContent = ret.navn;
                klon.querySelector("[data-pris]").textContent = ret.pris;
                klon.querySelector("[data-kortbeskrivelse]").textContent = ret.kortbeskrivelse;
                klon.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
                klon.querySelector("[data-oprindelsesregion]").textContent = ret.oprindelsesregion;
                klon.querySelector("[data-billede]").setAttribute("src", "imgs/small/" + ret.billede + "-sm.jpg");

                templateModtager.appendChild(klon);
            });
        };

        function lavFiltre() {
            let forretter = retter.filter(ret => ret.kategori == "forretter");
            let hovedretter = retter.filter(ret => ret.kategori == "hovedretter");
            let desserter = retter.filter(ret => ret.kategori == "desserter");
            let drikkevarer = retter.filter(ret => ret.kategori == "drikkevarer");
            let sideorders = retter.filter(ret => ret.kategori == "sideorders");

            document.querySelector('#filter-alle').addEventListener("click", () => {
                visRetter(retter, "Menu");
            });
            document.querySelector('#filter-forretter').addEventListener("click", () => {
                //her henter den navnet på overskiften der bliver ændret, når amn trykker på de forskellige knapper
                visRetter(forretter, "Forretter");
            });
            document.querySelector('#filter-hovedretter').addEventListener("click", () => {
                visRetter(hovedretter, "Hovedretter");
            });
            document.querySelector('#filter-desserter').addEventListener("click", () => {
                visRetter(desserter, "Desserter");
            });
            document.querySelector('#filter-drikkevarer').addEventListener("click", () => {
                visRetter(drikkevarer, "Drikkevarer");
            });
            document.querySelector('#filter-sideorders').addEventListener("click", () => {
                visRetter(drikkevarer, "Sideorders");
            });
        }
