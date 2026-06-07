/*
 * Portfolio JS — Lens template modified for portfolio use
 * Flow:
 *   1. Load → show profile photo + name/bio in sidebar, show profile photo fullscreen in viewer
 *   2. Click profile photo → sidebar switches to works list, viewer stays on profile photo
 *   3. Click a work → viewer loads that work's image, sidebar shows work detail
 *   4. Back buttons restore previous state
 *
 * HOW TO UPDATE YOUR PORTFOLIO ON GITHUB PAGES:
 *   1. Open admin.html in your browser (no server needed — just open the file).
 *   2. Add / edit your sections and works.
 *   3. Click "Export Code for GitHub" — copy the generated snippet.
 *   4. Paste it below, replacing everything between the two ═══ markers.
 *   5. Save this file and commit + push to GitHub. Done!
 */

(function ($) {

	/* =====================================================================
	 * ═══ PASTE YOUR EXPORTED DATA HERE (replace only this block) ═══
	 * ===================================================================== */
	var PORTFOLIO_DATA = [
	{
		"label": "Exhibition",
		"items": [
			{
				"title": "Exhibition photo 1",
				"tag": "",
				"description": "I took this photo to capture the beauty of Thimphu from a higher viewpoint. From here, I could see how the city stretches across the valley, with buildings nestled among the hills. The road running through the center adds a sense of direction and movement, while the surrounding greenery highlights Bhutan's natural beauty. To me, this image reflects the peaceful blend of urban development and nature that makes Thimphu unique.",
				"year": "",
				"thumb": "images/fulls/Exhibition photo 1_kelxang.jpg",
				"full": "images/fulls/Exhibition photo 1_kelxang.jpg",
				"position": "center",
				"size": "contain"
			}
		]
	}
];

var PORTFOLIO_PROFILE = {
	"name": "Tshering Kelxang",
	"bio": "Gamer. Videographer. Animation Rigger. Photographer. Graphic Designer. Crafting worlds through lenses, rigs, and pixels — one frame at a time."
};
	/* ═══ END OF DATA BLOCK ═══ */

	/* If admin has previewed changes locally via localStorage, prefer that.
	 * On GitHub Pages, localStorage is empty so PORTFOLIO_DATA above is used. */
	var sections = (function() {
		try {
			var saved = localStorage.getItem('portfolio_sections');
			if (saved) {
				var parsed = JSON.parse(saved);
				if (parsed && parsed.length > 0) return parsed;
			}
		} catch(e) {}
		return PORTFOLIO_DATA;
	})();

	/* Flat works array (section + index stored on each for navigation) */
	var works = [];
	$.each(sections, function (si, section) {
		$.each(section.items, function (ii, item) {
			item._sectionIndex = si;
			item._sectionLabel = section.label;
			works.push(item);
		});
	});

	/* =====================================================================
	 * PROFILE — load name & bio from localStorage (local) or PORTFOLIO_PROFILE (GitHub Pages)
	 * ===================================================================== */
	var DEFAULT_PROFILE = {
		name: 'Tshering Kelxang',
		bio:  'Gamer. Videographer. Animation Rigger. Photographer. Graphic Designer. Crafting worlds through lenses, rigs, and pixels — one frame at a time.'
	};
	var profileData = (function() {
		try {
			var raw = localStorage.getItem('portfolio_profile');
			if (raw) {
				var p = JSON.parse(raw);
				if (p && p.name) return p;
			}
		} catch(e) {}
		// Fall back to exported PORTFOLIO_PROFILE (for GitHub Pages)
		if (typeof PORTFOLIO_PROFILE !== 'undefined' && PORTFOLIO_PROFILE.name)
			return PORTFOLIO_PROFILE;
		return DEFAULT_PROFILE;
	})();

	/* Apply to DOM immediately */
	$(document).ready(function() {
		$('#profile-name').text(profileData.name);
		$('#profile-bio').text(profileData.bio);
	});

	/* =====================================================================
	 * PROFILE PHOTO shown fullscreen in viewer on load
	 * ===================================================================== */
	var profileFullImage     = "images/bg.jpg";
	var profileFallbackImage = "images/fulls/01.jpg";

	/* =====================================================================
	 * STATE
	 * ===================================================================== */
	var state = {
		view: "profile",   // "profile" | "works" | "work-detail"
		activeIndex: null
	};

	/* =====================================================================
	 * DOM REFS
	 * ===================================================================== */
	var $body, $main, $viewer, $profilePanel, $worksPanel, $worksList,
	    $workDetailPanel, $detailTitle, $detailTag, $detailDesc, $detailYear,
	    $worksBackBtn, $detailBackBtn, $profilePhotoWrap;

	/* =====================================================================
	 * VIEWER ENGINE
	 * ===================================================================== */
	var Viewer = {
		$el: null,
		$slide: null,
		$slideImage: null,
		$slideCaption: null,
		$navNext: null,
		$navPrevious: null,
		$toggle: null,
		locked: false,

		init: function () {
			this.$el = $(
				'<div id="viewer">' +
					'<div class="inner">' +
						'<div class="nav-previous"></div>' +
						'<div class="nav-next"></div>' +
						'<div class="toggle"></div>' +
					'</div>' +
				'</div>'
			).appendTo($body);

			this.$navNext     = this.$el.find('.nav-next');
			this.$navPrevious = this.$el.find('.nav-previous');
			this.$toggle      = this.$el.find('.toggle');

			this.$slide = $('<div class="slide active"><div class="caption"></div><div class="image"></div></div>');
			this.$slide.appendTo(this.$el);
			this.$slideImage   = this.$slide.find('.image');
			this.$slideCaption = this.$slide.find('.caption');

			this.$toggle.on('click', function () {
				Portfolio.toggleSidebar();
			});

			this.$navNext.on('click', function () {
				if (state.view === 'work-detail') Portfolio.nextWork();
			});
			this.$navPrevious.on('click', function () {
				if (state.view === 'work-detail') Portfolio.prevWork();
			});

			var touchX = null;
			this.$el
				.on('touchstart', function (e) { touchX = e.originalEvent.touches[0].pageX; })
				.on('touchmove', function (e) {
					if (touchX === null) return;
					var diff = touchX - e.originalEvent.touches[0].pageX;
					if (Math.abs(diff) > 50) {
						diff > 0 ? Portfolio.nextWork() : Portfolio.prevWork();
						touchX = null;
					}
				});

			$(window).on('keydown', function (e) {
				if (breakpoints.active('<=xsmall')) return;
				if (state.view !== 'work-detail') return;
				if (e.keyCode === 39 || e.keyCode === 32) { e.preventDefault(); Portfolio.nextWork(); }
				if (e.keyCode === 37) { e.preventDefault(); Portfolio.prevWork(); }
				if (e.keyCode === 27) { Portfolio.toggleSidebar(); }
			});
		},

		load: function (url, position, captionHTML, size) {
			var self = this;
			if (self.locked) return;
			self.locked = true;

			/* Encode spaces and special chars so CSS url() handles filenames correctly */
			var encodedUrl = url.split('/').map(function(part) {
				return encodeURIComponent(part);
			}).join('/');

			var bgSize = size || 'cover';

			var $img = $('<img />');
			self.$slide.addClass('loading');
			self.$slideImage.css('opacity', 0);

			$img.on('load', function () {
				self.$slideImage
					.css('background-image', 'url(' + encodedUrl + ')')
					.css('background-position', position || 'center')
					.css('background-size', bgSize)
					.css('opacity', 1);
				self.$slideCaption.html(captionHTML || '');
				self.$slide.removeClass('loading');
				self.locked = false;
			}).on('error', function () {
				self.$slideImage
					.css('background-image', 'url(' + profileFallbackImage + ')')
					.css('background-position', 'center')
					.css('background-size', 'cover')
					.css('opacity', 1);
				self.$slideCaption.html(captionHTML || '');
				self.$slide.removeClass('loading');
				self.locked = false;
			}).attr('src', url);
		},

		showNav: function (show) {
			this.$navNext.css('display', show ? '' : 'none');
			this.$navPrevious.css('display', show ? '' : 'none');
		}
	};

	/* =====================================================================
	 * PORTFOLIO CONTROLLER
	 * ===================================================================== */
	var Portfolio = {

		init: function () {
			$body            = $('body');
			$main            = $('#main');
			$profilePanel    = $('#profile-panel');
			$worksPanel      = $('#works-panel');
			$worksList       = $('#works-list');
			$workDetailPanel = $('#work-detail-panel');
			$detailTitle     = $('#detail-title');
			$detailTag       = $('#detail-tag');
			$detailDesc      = $('#detail-description');
			$detailYear      = $('#detail-year');
			$worksBackBtn    = $('#works-back-btn');
			$detailBackBtn   = $('#detail-back-btn');
			$profilePhotoWrap = $('#profile-photo-wrap');

			breakpoints({
				xlarge: ['1281px', '1680px'],
				large:  ['981px',  '1280px'],
				medium: ['737px',  '980px'],
				small:  ['481px',  '736px'],
				xsmall: [null,     '480px']
			});

			Viewer.init();
			Viewer.showNav(false);
			this.buildWorksList();
			this.showProfileView();

			$profilePhotoWrap.on('click', function () {
				Portfolio.showWorksView();
			});

			$worksBackBtn.on('click', function () {
				Portfolio.showProfileView();
			});

			$detailBackBtn.on('click', function () {
				Portfolio.showWorksView();
			});

			$('<div class="toggle"></div>').appendTo($main).on('click', function () {
				Portfolio.toggleSidebar();
			});

			$(window).on('load', function () {
				$body.removeClass('is-preload-0');
				setTimeout(function () { $body.removeClass('is-preload-1'); }, 100);
				setTimeout(function () { $body.removeClass('is-preload-2'); }, 200);
			});
		},

		/* Build works list grouped by section */
		buildWorksList: function () {
			$worksList.empty();

			var workIndex = 0;
			$.each(sections, function (si, section) {
				/* Section header */
				$worksList.append(
					'<div class="works-section-header">' + section.label + '</div>'
				);

				$.each(section.items, function (ii, w) {
					var idx = workIndex++;
					var $item = $(
						'<button class="work-item" data-index="' + idx + '">' +
							'<img class="work-thumb" src="' + w.thumb + '" alt="' + w.title + '" />' +
							'<div class="work-meta">' +
								'<div class="work-title">' + w.title + '</div>' +
								'<div class="work-tag">' + w.tag + '</div>' +
							'</div>' +
						'</button>'
					);
					$item.on('click', function () {
						Portfolio.showWorkDetail(idx);
					});
					$worksList.append($item);
				});
			});
		},

		/* ── View: Profile ── */
		showProfileView: function () {
			state.view = 'profile';
			state.activeIndex = null;

			$workDetailPanel.hide().removeClass('visible');
			$worksPanel.hide().css('display', '');
			$profilePanel.show();

			Viewer.load(profileFullImage, 'center top', '');
			Viewer.showNav(false);
			$worksList.find('.work-item').removeClass('active');
		},

		/* ── View: Works List ── */
		showWorksView: function () {
			state.view = 'works';

			$profilePanel.hide();
			$workDetailPanel.hide().removeClass('visible');
			$worksPanel.css('display', 'flex').show();

			if (state.activeIndex === null) {
				Viewer.load(profileFullImage, 'center top', '');
				Viewer.showNav(false);
			} else {
				Viewer.showNav(true);
			}
		},

		/* ── View: Work Detail ── */
		showWorkDetail: function (index) {
			state.view = 'work-detail';
			state.activeIndex = index;

			var w = works[index];

			$profilePanel.hide();
			$worksPanel.css('display', 'flex').show();
			$workDetailPanel.show().addClass('visible');

			$detailTag.text(w.tag);
			$detailTitle.text(w.title);
			$detailDesc.text(w.description);
			$detailYear.text(w.year);

			$worksList.find('.work-item').removeClass('active');
			$worksList.find('.work-item[data-index="' + index + '"]').addClass('active');

			var $activeItem = $worksList.find('.work-item.active');
			if ($activeItem.length) {
				$worksList.scrollTop(
					$worksList.scrollTop() + $activeItem.position().top - $worksList.height() / 2
				);
			}

			var tagYear = [w.tag, w.year].filter(Boolean).join(' — ');
			var captionHTML =
				'<h2>' + w.title + '</h2>' +
				(tagYear ? '<p>' + tagYear + '</p>' : '') +
				(w.description ? '<span class="caption-desc">' + w.description + '</span>' : '');

			Viewer.load(w.full, w.position || 'center', captionHTML, w.size || 'cover');
			Viewer.showNav(true);
		},

		/* ── Navigate within works ── */
		nextWork: function () {
			if (state.activeIndex === null) return;
			var next = (state.activeIndex + 1) % works.length;
			this.showWorkDetail(next);
		},

		prevWork: function () {
			if (state.activeIndex === null) return;
			var prev = (state.activeIndex - 1 + works.length) % works.length;
			this.showWorkDetail(prev);
		},

		toggleSidebar: function () {
			if ($body.hasClass('fullscreen')) {
				$body.removeClass('fullscreen');
				$main.focus();
			} else {
				$body.addClass('fullscreen');
				$main.blur();
			}
		},

		/* ── Toggle sidebar ── */
		// (end of Portfolio object)
	};

	/* =====================================================================
	 * BOOT
	 * ===================================================================== */
	$(document).ready(function () {
		Portfolio.init();
	});

})(jQuery);
