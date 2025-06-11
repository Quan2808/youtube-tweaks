<tp-yt-paper-dialog
  style-target="host"
  role="dialog"
  tabindex="-1"
  class="style-scope ytd-popup-container"
  prevent-autonav="true"
  modern=""
  style="outline: none; position: fixed; top: 390.5px; left: 785.531px; z-index: 2202;"
>
  <yt-confirm-dialog-renderer
    class="style-scope ytd-popup-container"
    dialog="true"
    tabindex="-1"
  >
    <div id="spinner" class="style-scope yt-confirm-dialog-renderer" hidden="">
      <tp-yt-paper-spinner
        class="style-scope yt-confirm-dialog-renderer"
        aria-hidden="true"
        aria-label="loading"
      >
        <div id="spinnerContainer" class="  style-scope tp-yt-paper-spinner">
          <div class="spinner-layer layer-1 style-scope tp-yt-paper-spinner">
            <div class="circle-clipper left style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
            <div class="circle-clipper right style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
          </div>
          <div class="spinner-layer layer-2 style-scope tp-yt-paper-spinner">
            <div class="circle-clipper left style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
            <div class="circle-clipper right style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
          </div>
          <div class="spinner-layer layer-3 style-scope tp-yt-paper-spinner">
            <div class="circle-clipper left style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
            <div class="circle-clipper right style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
          </div>
          <div class="spinner-layer layer-4 style-scope tp-yt-paper-spinner">
            <div class="circle-clipper left style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
            <div class="circle-clipper right style-scope tp-yt-paper-spinner">
              <div class="circle style-scope tp-yt-paper-spinner"></div>
            </div>
          </div>
        </div>
      </tp-yt-paper-spinner>
      <div
        id="loading-message"
        class="body-text style-scope yt-confirm-dialog-renderer"
        hidden=""
      >
        <yt-formatted-string
          class="style-scope yt-confirm-dialog-renderer"
          is-empty=""
        >
          <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
        </yt-formatted-string>
      </div>
    </div>
    <yt-img-shadow
      id="thumbnail"
      notify-on-loaded=""
      width="256"
      class="style-scope yt-confirm-dialog-renderer no-transition"
      hidden=""
    ></yt-img-shadow>
    <div
      id="main"
      class="style-scope yt-confirm-dialog-renderer"
      style="width: 100%;"
    >
      <yt-img-shadow
        id="header-image"
        notify-on-loaded=""
        class="style-scope yt-confirm-dialog-renderer no-transition"
        hidden=""
      ></yt-img-shadow>
      <h2 class="heading style-scope yt-confirm-dialog-renderer">
        <yt-formatted-string
          id="title"
          class="style-scope yt-confirm-dialog-renderer"
          is-empty=""
          hidden=""
        >
          <yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string>
        </yt-formatted-string>
      </h2>
      <tp-yt-paper-dialog-scrollable
        id="scroller"
        class="body-text style-scope yt-confirm-dialog-renderer no-padding scrolled-to-bottom"
      >
        <div
          id="scrollable"
          class="scrollable style-scope tp-yt-paper-dialog-scrollable"
          style="max-height: 801px; box-sizing: border-box; max-width: 1840px;"
        >
          <yt-formatted-string
            class="line-text style-scope yt-confirm-dialog-renderer"
            respect-html-dir=""
            split-lines=""
          >
            Video paused. Continue watching?
          </yt-formatted-string>
          <dom-repeat class="style-scope yt-confirm-dialog-renderer">
            <template
              is="dom-repeat"
              class="style-scope ytd-popup-container"
            ></template>
          </dom-repeat>
        </div>
      </tp-yt-paper-dialog-scrollable>
      <div
        id="checkbox-container"
        class="style-scope yt-confirm-dialog-renderer"
        hidden=""
      ></div>
      <div class="buttons style-scope yt-confirm-dialog-renderer">
        <yt-button-renderer
          id="cancel-button"
          dialog-dismiss=""
          class="style-scope yt-confirm-dialog-renderer"
          button-renderer=""
          button-next=""
          hidden=""
        >
          <yt-button-shape class="style-scope ytd-popup-container"></yt-button-shape>
          <tp-yt-paper-tooltip
            offset="8"
            disable-upgrade=""
            class="style-scope ytd-popup-container"
          >
            {" "}
          </tp-yt-paper-tooltip>
        </yt-button-renderer>
        <yt-button-renderer
          id="checkbox-enabled-confirm-button"
          dialog-confirm=""
          class="style-scope yt-confirm-dialog-renderer"
          hidden=""
          button-renderer=""
          button-next=""
        >
          <yt-button-shape class="style-scope ytd-popup-container"></yt-button-shape>
          <tp-yt-paper-tooltip
            offset="8"
            disable-upgrade=""
            class="style-scope ytd-popup-container"
          >
            {" "}
          </tp-yt-paper-tooltip>
        </yt-button-renderer>
        <yt-button-renderer
          id="confirm-button"
          class="style-scope yt-confirm-dialog-renderer"
          button-renderer=""
          button-next=""
          dialog-confirm=""
        >
          <yt-button-shape class="style-scope ytd-popup-container">
            <button
              class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m yt-spec-button-shape-next--enable-backdrop-filter-experiment"
              aria-disabled="false"
              aria-label="Yes"
              title=""
              style=""
            >
              <div class="yt-spec-button-shape-next__button-text-content">
                <span
                  class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap"
                  role="text"
                >
                  Yes
                </span>
              </div>
              <yt-touch-feedback-shape style="border-radius: inherit;">
                <div
                  aria-hidden="true"
                  class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response"
                >
                  <div class="yt-spec-touch-feedback-shape__stroke"></div>
                  <div class="yt-spec-touch-feedback-shape__fill"></div>
                </div>
              </yt-touch-feedback-shape>
            </button>
          </yt-button-shape>
          <tp-yt-paper-tooltip
            offset="8"
            disable-upgrade=""
            class="style-scope ytd-popup-container"
          ></tp-yt-paper-tooltip>
        </yt-button-renderer>
      </div>
    </div>
  </yt-confirm-dialog-renderer>
</tp-yt-paper-dialog>;
