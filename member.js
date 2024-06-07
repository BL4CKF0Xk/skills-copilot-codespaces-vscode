function skillsMember() {
  if (!document.getElementById('skills')) return;
  const member = document.getElementById('skills');
  const memberText = member.innerText;
  const memberArray = memberText.split(',');
  member.innerHTML = '';
  memberArray.forEach((skill) => {
    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skills-member');
    skillDiv.innerText = skill;
    member.appendChild(skillDiv);
  });
}