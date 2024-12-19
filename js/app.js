var url = $(location).attr("href");
var id = getParameter("id");

$(document).ready(function () {
  $.getJSON("./assets/apps.json?v=202112301400", function (data) {
    if (id == null) renderList(data);
    else renderApp(data);

    var config = "";
    if (data != null) {
      config = typeof data.environment == "string" ? data.environment : "";
    }
    if (config !== "") {
      document.title = document.title + ` (${config})`;
    }
  });
});

function renderList(data) {
  // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
  var list = [];

  if (data != null) {
    list = data.apps instanceof Array ? data.apps : [data.apps];
  }

  // app detail list
  $.each(list, function (_, app) {
    if (!app.isUse) {
      return true;
    }

    $("#app_list").append(`
      <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
        <div class="mdl-card__media">
          <img class="article-image" src="${app.indexImageUrl}" border="0" alt="">
        </div>
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">${app.name}</h2>
        </div>
        <div class="mdl-card__supporting-text">${app.summary}</div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent"
            href="app.html?id=${app.id}">Read more</a>
        </div>
      </div>`);
  });
}

function renderApp(data) {
  // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
  var list = [];

  if (data != null) {
    list = data.apps instanceof Array ? data.apps : [data.apps];
  }

  function generateDownloadHtml(downloads, platform) {
    if (downloads && downloads.length > 0) {
      var download = downloads.find(function (element) {
        return element.platform.toUpperCase() === platform && element.isUse;
      });
      var attr = download ? `href="${download.url}"` : `disabled="disabled"`;
      var text = download ? "Install" : "Not available";
      return `
        <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          style="float: right;" ${attr}>
          ${text}
        </a>`;
    } else {
      return `
        <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          style="float: right;" disabled="disabled">
          Not available
        </a>`;
    }
  }

  function generateScreenshotHtml(screenshots) {
    var screenshotHtml = "";
    if (screenshots && screenshots.length > 0) {
      $.each(screenshots, function (_, screenshot) {
        var orientation =
          typeof screenshot.orientation == "string"
            ? screenshot.orientation
            : "portrait";
        screenshotHtml += `
          <div class="mdl-cell ${
            orientation === "landscape" ? "mdl-cell--6-col" : "mdl-cell--3-col"
          } mdl-cell--1-col-phone">
            <img class="article-image" src="${
              screenshot.url
            }" border="0" alt="${screenshot.alt}">
          </div>`;
      });
    }
    return screenshotHtml;
  };

  function generateHistoryHtml(histories) {
    var historyHtml = "";
    if (histories && histories.length > 0) {
      $.each(histories, function (index, history) {
        if (index >= 3) return false;
        historyHtml += `<p><b>${history.version}</b><br/>${history.description}</p>`;
      });
    }
    return historyHtml;
  };

  // app detail list
  $.each(list, function (_, app) {
    if (!app.isUse) {
      return true;
    }

    if (id != app.id) {
      return true;
    }

    var buttonHtml = "";

    if (
      /iPhone|iPad|iPod/i.test(window.navigator.userAgent) ||
      (/Macintosh/i.test(window.navigator.userAgent) &&
        navigator.maxTouchPoints === 5)
    ) {
      buttonHtml = generateDownloadHtml(app.downloads, "IOS");
    } else if (/Android/i.test(window.navigator.userAgent)) {
      buttonHtml = generateDownloadHtml(app.downloads, "ANDROID");
    } else if (/Windows/i.test(window.navigator.userAgent)) {
      buttonHtml = generateDownloadHtml(app.downloads, "WINDOWS");
    } else {
      buttonHtml = generateDownloadHtml();
    }

    var html = `
      <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
        <!-- App Information -->
        <div class="mdl-grid portfolio-copy">
          <div class="mdl-cell mdl-cell--4-col mdl-cell--2-col-phone">
            <img class="article-image" style="border-radius:20px; width: 100px; height: auto;" src="${
              app.iconUrl
            }" border="0" alt="">
          </div>
          <div class="mdl-cell mdl-cell--8-col mdl-cell--2-col-phone">
            <h2 class="mdl-card__title-text">${app.name}</h2>
            <p>${app.summary}</p>
          </div>
          <div class="mdl-cell mdl-cell--12-col">
            ${buttonHtml}
          </div>
          <!-- Screenshot -->
          <h3 class="mdl-cell mdl-cell--12-col mdl-typography--headline">Screenshot</h3>
          ${generateScreenshotHtml(app.screenshots)}
          <!-- Description -->
          <h3 class="mdl-cell mdl-cell--12-col mdl-typography--headline">Description</h3>
          <div class="mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding">
            <p>${app.description}</p>
          </div>
          <!-- What&#039;s new -->
          <h3 class="mdl-cell mdl-cell--12-col mdl-typography--headline">What&#039;s new</h3>
          <div class="mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding">
            <!-- Information -->
            ${generateHistoryHtml(app.histories)}
          </div>
        </div>
      </div>`;

    $("#app_detail").append(html);
  });
}

function goToByScroll(elemId) {
  $("html,body").animate(
    {
      scrollTop: $("#" + elemId).offset().top,
    },
    "slow"
  );
}

function getParameter(param) {
  var returnValue;
  var parameters = url.slice(url.indexOf("?") + 1, url.length).split("&");
  for (var parameter of parameters) {
    var varName = parameter.split("=")[0];
    if (varName.toUpperCase() == param.toUpperCase()) {
      returnValue = parameter.split("=")[1];
      return decodeURIComponent(returnValue);
    }
  }
}
