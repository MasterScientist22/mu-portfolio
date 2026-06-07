/*
 * Portfolio JS — Lens template modified for portfolio use
 * Flow:
 *   1. Load → show profile photo + name/bio in sidebar, show profile photo fullscreen in viewer
 *   2. Click profile photo → sidebar switches to works list, viewer stays on profile photo
 *   3. Click a work → viewer loads that work's image, sidebar shows work detail
 *   4. Back buttons restore previous state
 */

(function ($) {

	/* =====================================================================
	 * WORKS DATA — organised by section
	 * Each section: { label: string, items: [...works] }
	 * Each work:
	 *   title       : string
	 *   tag         : category label
	 *   description : shown in sidebar + as caption on the image
	 *   year        : string
	 *   thumb       : path to thumbnail image
	 *   full        : path to full-size image
	 *   position    : (optional) CSS background-position for the viewer
	 * ===================================================================== */
	var sections = [
		{
			label: "Exhibition",
			items: [
				{
					title: "Exhibition — Photo 1",
					tag: "Exhibition",
					description: "A piece from Tshering Kelxang's exhibition collection.",
					year: "2024",
					thumb: "images/fulls/Exhibition photo 1_kelxang.jpg",
					full:  "images/fulls/Exhibition photo 1_kelxang.jpg",
					position: "center",
					size: "contain"
				},
				{
					title: "Exhibition — Photo 2",
					tag: "Exhibition",
					description: "A piece from Tshering Kelxang's exhibition collection.",
					year: "2024",
					thumb: "images/fulls/Exhibition photo 2_kelxang.jpg",
					full:  "images/fulls/Exhibition photo 2_kelxang.jpg",
					position: "center",
					size: "contain"
				},
				{
					title: "Exhibition — Photo 3",
					tag: "Exhibition",
					description: "A piece from Tshering Kelxang's exhibition collection.",
					year: "2024",
					thumb: "images/fulls/Exhibition photo 3_kelxang.jpg",
					full:  "images/fulls/Exhibition photo 3_kelxang.jpg",
					position: "center",
					size: "contain"
				}
			]
		},
		{
			label: "Post Card",
			items: [
				{
					title: "Post Card 1",
					tag: "Post Card",
					description: "An original postcard design by Tshering Kelxang.",
					year: "2024",
					thumb: "images/fulls/Post card 1_kelxang.jpg",
					full:  "images/fulls/Post card 1_kelxang.jpg",
					position: "center",
					size: "contain"
				},
				{
					title: "Post Card 2",
					tag: "Post Card",
					description: "An original postcard design by Tshering Kelxang.",
					year: "2024",
					thumb: "images/fulls/Post card 2_kelxang.jpg",
					full:  "images/fulls/Post card 2_kelxang.jpg",
					position: "center",
					size: "contain"
				},
				{
					title: "Post Card 3",
					tag: "Post Card",
					description: "An original postcard design by Tshering Kelxang.",
					year: "2024",
					thumb: "images/fulls/Post card 3_kelxang.jpg",
					full:  "images/fulls/Post card 3_kelxang.jpg",
					position: "center",
					size: "contain"
				}
			]
		},
		{
			label: "Other Works",
			items: [
				{
					title: "Dragon's Lair — Fan Edit",
					tag: "Videography",
					description: "A cinematic fan-made shortfilm inspired by open-world RPGs. Shot, edited, and colour-graded entirely by Tshering — blending dramatic lighting with game-inspired framing.",
					year: "2024",
					thumb: "images/thumbs/01.jpg",
					full: "images/fulls/01.jpg",
					position: "center"
				},
				{
					title: "Phantom Rig",
					tag: "Animation Rigging",
					description: "A full-body character rig built in Blender for a ghost-type game character. Features custom IK/FK switching, dynamic cloth simulation, and facial shape keys.",
					year: "2024",
					thumb: "images/thumbs/02.jpg",
					full: "images/fulls/02.jpg",
					position: "center"
				},
				{
					title: "Highlands at Dusk",
					tag: "Photography",
					description: "A golden-hour photography series captured across Bhutan's highland valleys. Each shot explores the interplay of mist, light, and landscape without any post-processing filters.",
					year: "2024",
					thumb: "images/thumbs/03.jpg",
					full: "images/fulls/03.jpg",
					position: "top center"
				},
				{
					title: "Neon Arcade — Brand Kit",
					tag: "Graphic Design",
					description: "Full visual identity for an esports café — logo, colour system, merchandise mockups, and social media templates. Inspired by retro arcade aesthetics fused with modern neon.",
					year: "2024",
					thumb: "images/thumbs/04.jpg",
					full: "images/fulls/04.jpg",
					position: "center"
				},
				{
					title: "Level Up — Game Montage",
					tag: "Videography",
					description: "A high-energy gaming montage edit combining screen-captured gameplay with behind-the-scenes reaction footage. Fast cuts synced to a custom audio mix.",
					year: "2023",
					thumb: "images/thumbs/05.jpg",
					full: "images/fulls/05.jpg",
					position: "top center"
				},
				{
					title: "Shadow Warrior Rig",
					tag: "Animation Rigging",
					description: "A combat-ready humanoid rig designed for a 3D action game prototype. Includes a modular weapon attachment system, hit-reaction bones, and a procedural spine.",
					year: "2023",
					thumb: "images/thumbs/06.jpg",
					full: "images/fulls/06.jpg",
					position: "center"
				},
				{
					title: "Street Portraits — Thimphu",
					tag: "Photography",
					description: "Candid portrait series documenting everyday life on the streets of Thimphu. Shot on a 50mm prime, focused on authentic emotion and natural light.",
					year: "2023",
					thumb: "images/thumbs/07.jpg",
					full: "images/fulls/07.jpg",
					position: "center"
				},
				{
					title: "Void Racer — UI Design",
					tag: "Graphic Design",
					description: "HUD and menu UI design for an indie sci-fi racing game. Focused on readability at high speed — minimal, glowing interfaces that don't obscure the action.",
					year: "2023",
					thumb: "images/thumbs/08.jpg",
					full: "images/fulls/08.jpg",
					position: "center"
				},
				{
					title: "The Last Run",
					tag: "Videography",
					description: "A short documentary following a local competitive gamer during the final hours of a 24-hour gaming marathon. Raw, unscripted, and emotionally charged.",
					year: "2022",
					thumb: "images/thumbs/09.jpg",
					full: "images/fulls/09.jpg",
					position: "left center"
				},
				{
					title: "Creature Rig — Serpent King",
					tag: "Animation Rigging",
					description: "A complex quadruped-hybrid creature rig featuring a multi-segment spine, dynamic tail physics, and wing membrane simulation. Built for a fantasy game demo.",
					year: "2022",
					thumb: "images/thumbs/10.jpg",
					full: "images/fulls/10.jpg",
					position: "center"
				},
				{
					title: "Frozen Light",
					tag: "Photography",
					description: "Winter macro photography series — ice crystals, frost patterns, and frozen water surfaces captured at dawn. Each frame is a single exposure, no compositing.",
					year: "2022",
					thumb: "images/thumbs/11.jpg",
					full: "images/fulls/11.jpg",
					position: "center"
				},
				{
					title: "GG Apparel — Merch Line",
					tag: "Graphic Design",
					description: "Streetwear-meets-gaming merch collection. Designed a line of 8 graphic tees and hoodies for a local gaming community, from concept art through print-ready files.",
					year: "2022",
					thumb: "images/thumbs/12.jpg",
					full: "images/fulls/12.jpg",
					position: "center"
				}
			]
		}
	];

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

			var captionHTML =
				'<h2>' + w.title + '</h2>' +
				'<p>' + w.tag + ' &mdash; ' + w.year + '</p>';

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

		/* ── Toggle sidebar ── */
		toggleSidebar: function () {
			if ($body.hasClass('fullscreen')) {
				$body.removeClass('fullscreen');
				$main.focus();
			} else {
				$body.addClass('fullscreen');
				$main.blur();
			}
		}
	};

	/* =====================================================================
	 * BOOT
	 * ===================================================================== */
	$(document).ready(function () {
		Portfolio.init();
	});

})(jQuery);
