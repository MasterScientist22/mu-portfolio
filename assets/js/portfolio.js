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
				"title": "Photo 1",
				"tag": "",
				"description": "I took this photo to capture the beauty of Thimphu from a higher viewpoint. From here, I could see how the city stretches across the valley, with buildings nestled among the hills. The road running through the center adds a sense of direction and movement, while the surrounding greenery highlights Bhutan's natural beauty. To me, this image reflects the peaceful blend of urban development and nature that makes Thimphu unique. great view",
				"year": "",
				"thumb": "images/fulls/Exhibition photo 1_kelxang.jpg",
				"full": "images/fulls/Exhibition photo 1_kelxang.jpg",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Photo 2",
				"tag": "",
				"description": "This photograph was taken during the inaugural Chimi Lhakhang Festival. It showcases local women performing a traditional Bhutanese folk dance while dressed in vibrant national attire and traditional jewelry. The image highlights Bhutan's living cultural heritage, where music, dance, and community gatherings play an important role in preserving traditions. The festive setting and participation of community members demonstrate the cultural significance of the event. As the first Chimi Lhakhang Festival, this celebration marked an important milestone in promoting and preserving local customs and traditions for future generations.",
				"year": "",
				"thumb": "images/fulls/Exhibition photo 2_kelxang.jpg",
				"full": "images/fulls/Exhibition photo 2_kelxang.jpg",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Photo 3",
				"tag": "",
				"description": "While walking around the Chimi Lhakhang Festival, I noticed this elderly man sitting alone under a tree and quietly enjoying the event. Unlike the busy crowd around him, he seemed completely at peace, simply taking in the atmosphere and watching the celebrations unfold. His gentle expression and relaxed posture caught my attention, and I felt it was a moment worth capturing. Dressed in traditional Bhutanese attire, he reflects the deep connection many Bhutanese people have with their culture and community. For me, this photograph is a reminder that festivals are not only about performances and celebrations but also about the quiet moments of happiness and reflection that people experience in their own way.",
				"year": "",
				"thumb": "images/fulls/Exhibition photo 3_kelxang.jpg",
				"full": "images/fulls/Exhibition photo 3_kelxang.jpg",
				"position": "center",
				"size": "contain"
			}
		]
	},
	{
		"label": "Post Card",
		"items": [
			{
				"title": "Photo 1",
				"tag": "",
				"description": "",
				"year": "",
				"thumb": "images/fulls/Post card 1_kelxang.jpg",
				"full": "images/fulls/Post card 1_kelxang.jpg",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Photo 2",
				"tag": "",
				"description": "",
				"year": "",
				"thumb": "images/fulls/Post card 2_kelxang.jpg",
				"full": "images/fulls/Post card 2_kelxang.jpg",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Photo 3",
				"tag": "",
				"description": "",
				"year": "",
				"thumb": "images/fulls/Post card 3_kelxang.jpg",
				"full": "images/fulls/Post card 3_kelxang.jpg",
				"position": "center",
				"size": "contain"
			}
		]
	},
	{
		"label": "Others",
		"items": [
			{
				"title": "My view",
				"tag": "",
				"description": "From where I stood, the detailed architecture caught my attention. I photographed the vibrant carvings and traditional design to showcase the beauty and cultural heritage I witnessed firsthand.",
				"year": "",
				"thumb": "images/fulls/1.webp",
				"full": "images/fulls/1.webp",
				"position": "center",
				"size": "cover"
			},
			{
				"title": "Peace Above the Mountains",
				"tag": "",
				"description": "I captured this view as the giant Buddha sat quietly above the valley and blessing the below, surrounded by layers of mountains. The calm atmosphere and soft blue tones made the whole scene feel peaceful and timeless.",
				"year": "",
				"thumb": "images/fulls/2.webp",
				"full": "images/fulls/2.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Valley",
				"tag": "",
				"description": "I captured this peaceful river winding through the valley, surrounded by hills and small settlements because the surrounding mountains and open landscape created a peaceful and scenic view that caught my attention.",
				"year": "",
				"thumb": "images/fulls/3.webp",
				"full": "images/fulls/3.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Red and Old",
				"tag": "",
				"description": "I saw him during the Chimi Lhakhang Festival, enjoying his lunch while watching the traditional dances.",
				"year": "",
				"thumb": "images/fulls/4.webp",
				"full": "images/fulls/4.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "On the Hills",
				"tag": "",
				"description": "I liked how the sunlight fell on one part of the hill while the rest remained in shadow. The contrast made the landscape look peaceful and full of natural beauty.",
				"year": "",
				"thumb": "images/fulls/5.webp",
				"full": "images/fulls/5.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Branch Manager",
				"tag": "",
				"description": "A crow perches proudly on the top of a tree branch, facing forward with a commanding presence. Its black feathers stand out against the green trees, giving the impression of a boss overseeing the forest",
				"year": "",
				"thumb": "images/fulls/6.webp",
				"full": "images/fulls/6.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Bridge",
				"tag": "",
				"description": "Car's travel across a narrow bridge in Thimphu, surrounded by tall green trees and rocky hills. The scene reflects daily life in Thimphu, where roads and bridges link people through the mountains and forests.",
				"year": "",
				"thumb": "images/fulls/7.webp",
				"full": "images/fulls/7.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "Modern and Tradition",
				"tag": "",
				"description": "I captured this street where cars and tall streetlights reflect modern life, yet the Bhutanese houses with green roofs and the forested hillside remind me how tradition and nature remain deeply rooted alongside progress.",
				"year": "",
				"thumb": "images/fulls/8.webp",
				"full": "images/fulls/8.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "The Warmth of Simplicity",
				"tag": "",
				"description": "I captured this moment as a child quietly enjoyed a simple meal while sitting among richly decorated wooden carvings. The traditional clothing, warm colors, and calm expression created a peaceful scene that felt both timeless and intimate.",
				"year": "",
				"thumb": "images/fulls/9.webp",
				"full": "images/fulls/9.webp",
				"position": "center",
				"size": "contain"
			},
			{
				"title": "The Road Between Trees",
				"tag": "",
				"description": "I captured this view as the road quietly cut through layers of trees, surrounded by endless greenery. The peaceful atmosphere and the path through the trees made the scene feel calm and untouched.",
				"year": "",
				"thumb": "images/fulls/10.webp",
				"full": "images/fulls/10.webp",
				"position": "center",
				"size": "contain"
			}
		]
	}
];

var PORTFOLIO_PROFILE = {
	"name": "Tshering Kelxang",
	"bio": ""
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

			// Use decode() for better performance
			$img.on('load', function () {
				var img = this;
				if (img.decode) {
					img.decode().then(function() {
						self.$slideImage
							.css('background-image', 'url(' + encodedUrl + ')')
							.css('background-position', position || 'center')
							.css('background-size', bgSize)
							.css('opacity', 1);
						self.$slideCaption.html(captionHTML || '');
						self.$slide.removeClass('loading');
						self.locked = false;
					}).catch(function() {
						self.$slideImage
							.css('background-image', 'url(' + encodedUrl + ')')
							.css('background-position', position || 'center')
							.css('background-size', bgSize)
							.css('opacity', 1);
						self.$slideCaption.html(captionHTML || '');
						self.$slide.removeClass('loading');
						self.locked = false;
					});
				} else {
					self.$slideImage
						.css('background-image', 'url(' + encodedUrl + ')')
						.css('background-position', position || 'center')
						.css('background-size', bgSize)
						.css('opacity', 1);
					self.$slideCaption.html(captionHTML || '');
					self.$slide.removeClass('loading');
					self.locked = false;
				}
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
							'<img class="work-thumb" src="' + w.thumb + '" alt="' + w.title + '" width="52" height="52" loading="lazy" decoding="async" />' +
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

			if (breakpoints.active('<=xsmall') && $body.hasClass('fullscreen')) {
				this.toggleSidebar();
			}

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

			if (breakpoints.active('<=xsmall') && $body.hasClass('fullscreen')) {
				this.toggleSidebar();
			}

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

			/* On mobile, hide sidebar automatically to show the work if it's not already hidden */
			if (breakpoints.active('<=xsmall') && !$body.hasClass('fullscreen')) {
				Portfolio.toggleSidebar();
			}
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
				/* On mobile, scroll to the active item when sidebar is shown */
				if (breakpoints.active('<=xsmall')) {
					var $activeItem = $worksList.find('.work-item.active');
					if ($activeItem.length) {
						$worksList.scrollTop(
							$worksList.scrollTop() + $activeItem.position().top - $worksList.height() / 2
						);
					}
				}
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
