import videojs from "video.js";

var videojsComponent = videojs.getComponent("Component");

/**
 * This is the left arrow to select the RangeSlider
 * @param {videojs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
var SelectionBarLeft = videojs.extend(videojsComponent, {
  /** @constructor */
  constructor: function(player, options) {
    videojsComponent.call(this, player, options);
    this.on("mousedown", this.onMouseDown);
    this.on("touchstart", this.onMouseDown);
    this.pressed = false;
  },
  init_: function() {
    this.rs = this.player_.rangeslider();
  },

  createEl: function() {
    return videojsComponent.prototype.createEl.call(this, "div", {
      className: "vjs-rangeslider-handle vjs-selectionbar-left-RS",
      innerHTML:
        '<div class="vjs-selectionbar-arrow-RS"></div><div class="vjs-selectionbar-line-RS"></div>'
    });
  },

  onMouseDown: function(event) {
    event.preventDefault();
    videojsBlockTextSelection();
    if (!this.rs.options.locked) {
      this.pressed = true;
      this.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
      this.on(document, "touchend", videojs.bind(this, this.onMouseUp));
      videojsAddClass(this.el_, "active");
    }
  },

  onMouseUp: function(event) {
    this.off(document, "mouseup", videojs.bind(this, this.onMouseUp), false);
    this.off(document, "touchend", videojs.bind(this, this.onMouseUp), false);
    videojsRemoveClass(this.el_, "active");
    if (!this.rs.options.locked) {
      this.pressed = false;
    }
  }
});

videojs.registerComponent("SelectionBarLeft", SelectionBarLeft);

export default SelectionBarLeft;
