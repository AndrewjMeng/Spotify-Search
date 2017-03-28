`use strict`;

$(document).ready(() => {
  $(`.cform-submit`).click(e => {
    removeElement(`#artist-card`);
    e.preventDefault();
    let artist = document.getElementById(`search-artist`).value;
    $.ajax({
      type: "POST",
      url:"http://dev.getethos.com/code1",
      success: result => {
        console.log(result)
      }
    })
    if (artist !== `` && artist !== ` `) {
      let url = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;
      ajaxCall(url, artist);
    } else {
      openModal();
    }

    document.getElementById(`search-artist`).value = ``;
  });

  let removeElement = (element) => {
    $(`${element}`).empty();
  };

  let ajaxCall = (url, searchedName) => {
    $.ajax({
      url: url,
      dataType: `json`,
      success: result => {
        addArtist(result, searchedName);
      },
    });
  };

  let addArtist = (result, searchedName) => {
    let artistList = result.artists.items;
    if (artistList.length < 0 || searchedName.match(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\<\>]/)) {
      openModal();
    } else {
      artistList.forEach(list => {
        let img = list.images.length > 0 ? list.images[0].url : `legend/img/spotify-logo.png`;
        let openPlayer = list.external_urls.spotify.length > 0 ? list.external_urls.spotify : `#`;
        let name = list.name;

        $(`<div class="span4">
          <div class="mask2">
            <img rel="prettyPhoto" src="${img}" alt="${name}">
              <div class="inside">
                <hgroup>
                  <h2>${name}</h2>
                </hgroup>
                <div class="entry-content">
                  <a class="more-link" href="${openPlayer}" class="card-link">
                  Open ${name} in Spotify Player</a>
                </div>
              </div>
            </div>
          </div>`).appendTo(`#artist-card`);
      });
      $(window.location.href = `#artist`);
    }
  };

  let openModal = () => {
    $(window.location.href = `#headerwrap`);
    $(`#myModal`).modal(`show`);

  };
});

$(document).on('click', 'a.more-link', event => {
    event.preventDefault();
    var url = $(this).attr('href');
    window.open(url, '_blank');
  });
