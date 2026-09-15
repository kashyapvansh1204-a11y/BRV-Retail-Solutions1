const $=id=>document.getElementById(id);

function showSection(id){
  document.querySelector('.cards').classList.add('hidden');
  document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
  $(id).classList.remove('hidden');
}
function goHome(){
  document.querySelector('.cards').classList.remove('hidden');
  document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
}

let records=JSON.parse(localStorage.getItem('brv_records')||'[]');
function renderRecords(){
  $('dataList').innerHTML=records.length?records.map((r,i)=>
    `<div style="padding:12px;margin-top:10px;border:1px solid #ddd;border-radius:9px">
      <b>${escapeHtml(r.name)}</b><br><span>${escapeHtml(r.details||'')}</span>
    </div>`).join(''):'<p>No saved data yet.</p>';
}
$('dataForm').addEventListener('submit',e=>{
  e.preventDefault();
  records.push({name:$('name').value,details:$('details').value});
  localStorage.setItem('brv_records',JSON.stringify(records));
  e.target.reset(); renderRecords();
});
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
renderRecords();

$('photoInput').addEventListener('change',e=>{
  $('photoGrid').innerHTML='';
  [...e.target.files].forEach(file=>{
    const img=document.createElement('img');
    img.src=URL.createObjectURL(file);
    $('photoGrid').appendChild(img);
  });
});
$('excelInput').addEventListener('change',e=>{
  const f=e.target.files[0];
  $('fileInfo').textContent=f?`Selected: ${f.name} (${Math.round(f.size/1024)} KB)`:'No file selected.';
});
