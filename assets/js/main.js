/* Open Lab Insight — prototype
   JS d'appoint uniquement. Aucun backend : les formulaires sont simulés. */
(function () {
  'use strict';

  /* --- Année courante dans le pied de page ------------------------------ */
  document.querySelectorAll('[data-oli-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Date du jour dans la barre supérieure ---------------------------- */
  document.querySelectorAll('[data-oli-date]').forEach(function (el) {
    el.textContent = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  });

  /* --- Filtres par rubrique (accueil + magazine) ------------------------ */
  var filterGroups = document.querySelectorAll('[data-oli-filters]');
  filterGroups.forEach(function (group) {
    var targetSel = group.getAttribute('data-oli-filters');
    var items = document.querySelectorAll(targetSel + ' [data-rubrique]');
    var empty = document.querySelector('[data-oli-empty]');

    group.addEventListener('click', function (event) {
      var btn = event.target.closest('.oli-filter');
      if (!btn) return;

      group.querySelectorAll('.oli-filter').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      var wanted = btn.getAttribute('data-filter');
      var visible = 0;
      items.forEach(function (item) {
        var match = wanted === 'all' || item.getAttribute('data-rubrique') === wanted;
        item.hidden = !match;
        if (match) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  });

  /* --- Points de diffusion : liste <-> repères sur la carte -------------- */
  var pointsRoot = document.querySelector('[data-oli-points]');
  if (pointsRoot) {
    var select = function (id) {
      document.querySelectorAll('[data-point-id]').forEach(function (el) {
        el.classList.toggle('is-active', el.getAttribute('data-point-id') === id);
      });
      var card = document.querySelector('.oli-point[data-point-id="' + id + '"]');
      if (card) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };

    document.querySelectorAll('[data-point-id]').forEach(function (el) {
      el.addEventListener('click', function () { select(el.getAttribute('data-point-id')); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(el.getAttribute('data-point-id')); }
      });
    });

    /* Recherche par ville / nom */
    var search = document.querySelector('[data-oli-points-search]');
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        var visible = 0;
        document.querySelectorAll('.oli-point').forEach(function (card) {
          var match = card.textContent.toLowerCase().indexOf(q) !== -1;
          card.hidden = !match;
          if (match) visible++;
          var pin = document.querySelector('.oli-pin[data-point-id="' + card.getAttribute('data-point-id') + '"]');
          if (pin) pin.hidden = !match;
        });
        var none = document.querySelector('[data-oli-points-empty]');
        if (none) none.hidden = visible !== 0;
      });
    }
  }

  /* --- Formulaires : validation Bootstrap, envoi simulé ------------------ */
  document.querySelectorAll('form[data-oli-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.classList.remove('was-validated');
      var note = form.querySelector('[data-oli-form-note]');
      if (note) {
        note.hidden = false;
        note.setAttribute('role', 'status');
        note.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      form.reset();
    });
  });

  /* --- Tooltips Bootstrap (non initialisés automatiquement) -------------- */
  if (window.bootstrap && window.bootstrap.Tooltip) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
      new window.bootstrap.Tooltip(el);
    });
  }
})();
