$(document).ready(function () {

    //ANIMATION
    {
        $('.form-result').addClass("hidden")

        $('.form-search').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated fadeInLeft',
            offset: 100
        });
    }

    //REQUEST
    $(document).on("click", ".form-search button", function (event) {
        event.preventDefault()
        let city = $(".form-search #city").val();
        if (city != "") {
            $("html, body").delay(2000).animate({scrollTop: $('#result').offset().top }, 200);
            $(".form-result").empty();
            $(".form-result").css("display", "none");
            $(".form-result").removeClass("visible animated fadeInRight full-visible");
            $(".form-search .badge").remove();
            $(".result").append(`
                <div class="loading">
                    <i class="fa fa-spin fa-spinner"></i>
                </div>
            `)
            {
                $.ajax({
                    url: `//api.openweathermap.org/data/2.5/weather?q=${city}&callback=saveWeather&APPID=8be9422aa4204e950adaa1860ed14b92`,
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'jsonp',
                    contentType: "application/json",
                })
            }
        } else {
            $(".form-search .form-group").append(`
                <div class="badge badge-danger mt-2">
                    <i class="fa fa-danger"></i> Insira o nome da cidade
                </div>
            `)
        }

    })

})

function saveWeather(data) {
    console.log(data)
    $('.form-search input[name="result"').val(JSON.stringify(data));
    $.ajax({
        url: `/search-weather`,
        type: 'POST',
        data: $('.form-search').serialize()
    }).done(function (dataret) {
        $(".form-search .badge").remove();
        dataret = data
        console.log(data)
        $(".form-result").append(`
            <div class="result-box">
                <span class="city-name">Nome: ${dataret.name}</span>
                <span class="city-coord">Coordenadas: ${dataret.coord.lon}/${dataret.coord.lat}</span>
                <span class="city-weather">Previsão: ${JSON.stringify(dataret.weather[0].main)}</span>
                <span class="city-weather">Descrição: ${JSON.stringify(dataret.weather[0].description)}</span>
                <span class="city-temp">Temp.: ${dataret.main.temp} °F</span>
                <span class="city-temp-min">Temp. Min.: ${dataret.main.temp_min} °F</span>
                <span class="city-temp-min">Temp. Max.: ${dataret.main.temp_max} °F</span>
            </div>
        `)
        $(".form-result").show();
        $('.form-result').addClass("visible animated fadeInRight full-visible")
        $(".result .loading").remove();
    })
}