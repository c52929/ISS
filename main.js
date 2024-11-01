'use strict';

document.getElementById("euclid_go").addEventListener("click",()=>{
	let i=2;
	let q=["",""];
	let a=[Math.max(euclid_m.value,euclid_n.value),Math.min(euclid_m.value,euclid_n.value)];
	let x=[1,0];
	let y=[0,1];
	let trs,tds;
	while(1){
		q.push(Math.floor(a[i-2]/a[i-1]));
		a.push(a[i-2]-q[i]*a[i-1]);
		// console.log([q[i],a[i],x[i],y[i]]);
		if(a[i]==0 || i>20000){
			if(euclid_checkbox.checked){
				x.push(x[i-2]-q[i]*x[i-1]);
				y.push(y[i-2]-q[i]*y[i-1]);
			}else{
				x.push("");
				y.push("");
			}
			break;
		}
		x.push(x[i-2]-q[i]*x[i-1]);
		y.push(y[i-2]-q[i]*y[i-1]);
		i++;
	}
	trs="<tr><td>i</td><td>q<sub>i</sub></td><td>a<sub>i</sub></td><td>x<sub>i</sub></td><td>y<sub>i</sub></td>";
	if(euclid_checkbox.checked){
		trs+=`<td>a<sub>i</sub></td><td>&equals;</td><td>a<sub>i-2</sub></td><td>&minus;</td><td>q<sub>i</sub></td><td>&times;</td><td>a<sub>i-1</sub></td>`;
	}
	trs+="</tr>";
	for(let j=0; j<=i; j++){
		if(j==i-1){
			tds=`<td>${j}</td><td>${q[j]}</td><td class="red">${a[j]}</td><td class="blue">${x[j]}</td><td class="blue">${y[j]}</td>`;
		}else{
			tds=`<td>${j}</td><td>${q[j]}</td><td>${a[j]}</td><td>${x[j]}</td><td>${y[j]}</td>`;
		}
		if(euclid_checkbox.checked){
			if(j<2){
				for(let i=0; i<7; i++){
					tds+="<td></td>";
				}
			}else{
				tds+=`<td>${a[j]}</td><td>&equals;</td><td>${a[j-2]}</td><td>&minus;</td><td>${q[j]}</td><td>&times;</td><td>${a[j-1]}</td>`;
			}
		}
		trs+=`<tr>${tds}</tr>`;
	}
	document.getElementById("euclid_table").innerHTML=trs;
	document.getElementById("euclid_table").classList.remove("none");
	document.getElementById("euclid_equation").innerHTML=`&nbsp;&therefore;&nbsp;gcd(${a[0]},${a[1]})&nbsp;&equals;&nbsp;<span class="red">${a[i-1]}</span>&nbsp;&equals;&nbsp;${a[0]}(<span class="blue">${x[i-1]}</span>)&nbsp;&plus;&nbsp;${a[1]}(<span class="blue">${y[i-1]}</span>)`;
	if(a[i-1]==1 && x[i-1]!=1 && y[i-1]!=1){
		let nums;
		if(x[i-1]>1){
			nums=`${a[0]}と${x[i-1]}は,(${a[1]}`;
		}else{
			nums=`${a[1]}と${y[i-1]}は,(${a[0]}`;
		}
		document.getElementById("euclid_johogyakugen").innerHTML=`&nbsp;&therefore;&nbsp;${nums}を法として)互いに乗法逆元である.`;
		document.getElementById("euclid_johogyakugen").classList.remove("none");
	}else{
		document.getElementById("euclid_johogyakugen").classList.add("none");
	}
})

document.getElementById("bekijoyo_go").addEventListener("click",()=>{
	let a=bekijoyo_a.value, m=bekijoyo_m.value;
	let bin=binary(bekijoyo_x.value);
	let trs;
	if(bekijoyo_checkbox.checked){
		let x=[Number(bin.charAt(bin.length-1))];
		let ai=[a];
		let modded=[ai[0]%m];
		let b=[[1,modded[0]][x[0]]];
		let proMod=[b[0]];
		trs=`<tr><td>i</td><td>x<sub>i</sub></td><td>A<sub>i</sub></td><td>A<sub>i</sub>&nbsp;<span class="ni">mod</span>&nbsp;N</td><td class="empty" rowspan=${bin.length+1}></td><td>B<sub>i</sub></td><td><span class="ni">prod. mod</span>&nbsp;N</td></tr>`;
		trs+="<tr><td>0</td><td>";
		if(x[0]==0){
			trs+=`<span class="tac gray">${x[0]}</span></td><td>${ai[0]}</td><td>${modded[0]}</td><td><span class="gray">1</span>`;
		}else{
			trs+=`<span class="tac">${x[0]}</span></td><td>${ai[0]}</td><td>${modded[0]}</td><td>${b[0]}`;
		}
		if(bin.length==1){
			trs+=`</td><td><span class="red">${proMod[0]}</span></td></tr>`;
		}else{
			trs+=`</td><td>${proMod[0]}</td></tr>`;
		}
		for(let i=1; i<bin.length; i++){
			x.push(Number(bin.charAt(bin.length-i-1)));
			ai.push(modded[i-1]**2);
			modded.push(ai[i]%m);
			b.push([1,modded[i]][x[i]]);
			proMod.push(proMod[i-1]*b[i]%m);
			trs+=`<tr><td>${i}</td><td>`;
			if(x[i]==0){
				trs+=`<span class="tac gray">${x[i]}</span></td><td>${ai[i]}</td><td>${modded[i]}</td><td><span class="gray">1</span>`;
			}else{
				trs+=`<span class="tac">${x[i]}</span></td><td>${ai[i]}</td><td>${modded[i]}</td><td>${b[i]}`;
			}
			if(i==bin.length-1){
				trs+=`</td><td><span class="red">${proMod[i]}</span></td></tr>`;
			}else{
				trs+=`</td><td>${proMod[i]}</td></tr>`;
			}
		}
		document.getElementById("bekijoyo_equation").innerHTML=`&nbsp;&therefore;&nbsp;${a}<sup>${bekijoyo_x.value}</sup>&nbsp;mod&nbsp;${m}&nbsp;&equals;&nbsp;<span class="red">${proMod[proMod.length-1]}</span>`;
	}else{
		let x=[Number(bin.charAt(0))];
		let y=[a%m];
		let ay=[""];
		let yPrime=[""];
		for(let i=1; i<bin.length; i++){
			x.push(Number(bin.charAt(i)));
			yPrime.push(y[i-1]**2%m);
			if(x[i]==1){
				ay.push(a*yPrime[i]);
				y.push(ay[i]%m);
			}else{
				ay.push("*");
				y.push(yPrime[i]);
			}
		}
		trs="<tr><td>i</td><td>x<sub>i</sub></td><td>y</td><td>ay&prime;</td><td>y&prime;</td></tr>";
		let tds;
		for(let i=0; i<bin.length; i++){
			if(i==bin.length-1){
				tds=`<td class="red">${y[i]}</td>`;
			}else{
				tds=`<td>${y[i]}</td>`;
			}
			if(x[i]==0){
				tds=`<td>${bin.length-i-1}</td><td class="gray">0</td>${tds}<td class="tac gray">&lt;&minus;</td><td>${yPrime[i]}</td>`;
			}else{
				tds=`<td>${bin.length-i-1}</td><td>1</td>${tds}<td>${ay[i]}</td><td>${yPrime[i]}</td>`;
			}
			trs+=`<tr>${tds}</tr>`;
			document.getElementById("bekijoyo_equation").innerHTML=`&nbsp;&therefore;&nbsp;${a}<sup>${bekijoyo_x.value}</sup>&nbsp;mod&nbsp;${m}&nbsp;&equals;&nbsp;<span class="red">${y[bin.length-1]}</span>`;
		}
	}
	let binGray="";
	for(let i=0; i<bin.length; i++){
		binGray+=["<span class='gray'>0</span>","1"][Number(bin.charAt(i))];
	}
	document.getElementById("bekijoyo_binary").innerHTML=`${bekijoyo_x.value}<sub>(10)</sub>&nbsp;&equals;&nbsp;${binGray}<sub>(2)</sub>`;
	document.getElementById("bekijoyo_table").innerHTML=trs;
	document.getElementById("bekijoyo_table").classList.remove("none");
})

function binary(dec){
	let binArr=[], bin="";
	while(1){
		binArr.push(dec%2);
		dec=Math.floor(dec/2);
		if(dec<=1){
			if(dec==1){
				bin="1";
			}
			break;
		}
	}
	for(let i=0; i<binArr.length; i++){
		bin+=binArr[binArr.length-i-1];
	}
	return bin;
}