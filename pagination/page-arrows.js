document.querySelector('.arrow-page-button').addEventListener('mouseover', () => {
  document.querySelector('.ph-arrow-fat-left').classList.add('move-left-arrow');
});
document.querySelector('.arrow-page-button').addEventListener('mouseout', () => {
  document.querySelector('.ph-arrow-fat-left').classList.remove('move-left-arrow');
});