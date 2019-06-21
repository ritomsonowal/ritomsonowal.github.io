// Navbar

$(document).ready(function() {
  $(window).on("scroll", function() {
    if ($(window).scrollTop() >= 20) {
      $(".navbar").addClass("compressed");
    } else {
      $(".navbar").removeClass("compressed");
    }
  });
});

// SmoothScroll

$(document).ready(function(){
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

// AnimateNumber

$(document).ready(function() {

    $("#repo-num").empty();
    $("#repos span").empty();
    $("#repo-lang").empty();
    $("#languages span").empty();
    $("#contributions span").empty();
    $("#count").empty();

            let url = "https://api.github.com/users/" + "ritomsonowal/repos";

            $.ajax({
                url,
                success: displayRepos,
                error: displayError
            });

            let url2 = "https://github-contributions-api.now.sh/v1/" + "ritomsonowal";
            console.log(url2);
            $.ajax({
                url: url2,
                success: displayCount,
                error: displayError2
            });

            function displayRepos(repos) {
                var languages = [];

                for (let repo of repos) {
                    console.log(repo);
                    if (repo.language && !languages.includes(repo.language)) {
                        languages.push(repo.language);
                    }
                }

                $("#languages span").append( $("<p>Languages</p>") );
                document.getElementById("repo-lang").innerHTML = languages.join(" | ");

                $('#repo-num').animateNumber( {
                    number: repos.length
                },
                {
                    easing: 'swing',
                    duration: 1200
                }
                );
                console.log("Happening");
                $("#repos span").append( $("<p>public repositories</p>") );
            }

            function displayError(err) {
                $("#repos").append($("<li>Error</li>"));
            }

            function displayCount(contributions) {
                var count = 0;
                // console.log("Count no of commits");
                for (let i of contributions.years) {
                    count = count + i.total;
                }

                $('#count').animateNumber( {
                    number: count
                },
                {
                    easing: 'swing',
                    duration: 1200
                }
                );
                $("#contributions span").append( $("<p>Total contributions</p>") );
                // document.getElementById("count").innerHTML = count;
            }

            function displayError2(err) {
                $("#count").append($("<span>Unavailable at the moment.</span>"));
            }

});

// $(document).ready(function(){
//     let url2 = "https://github-contributions-api.now.sh/v1/" + "ritomsonowal";
//     console.log(url2);
//     $.ajax({
//         url: url2,
//         success: displayCount,
//         error: displayError2
//     });
//
//     function displayCount(contributions) {
//         var count = 0;
//         // console.log("Count no of commits");
//         for (let i of contributions.years) {
//             count = count + i.total;
//         }
//
//         $('#count').animateNumber( {
//             number: count
//         },
//         {
//             easing: 'swing',
//             duration: 1200
//         }
//         );
//         $("#contributions span").append( $("<p>Total contributions</p>") );
//         // document.getElementById("count").innerHTML = count;
//     }
//
//     function displayError2(err) {
//         $("#count").append($("<span>Unavailable at the moment.</span>"));
//     }
// });
