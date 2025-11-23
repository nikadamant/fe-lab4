// Ефект hover для поля "Детально"
const detailsField = document.getElementById('details-field');
const detailsTooltip = document.getElementById('details-tooltip');

if (detailsField && detailsTooltip) {
  // При наведенні миші
  detailsField.addEventListener('mouseenter', () => {
    detailsField.classList.add('details-field-hover');
    detailsTooltip.style.visibility = 'visible';
  });
  
  // При виході миші
  detailsField.addEventListener('mouseleave', () => {
    detailsField.classList.remove('details-field-hover');
    detailsTooltip.style.visibility = 'hidden';
  });
}

