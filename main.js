'use strict';

document.getElementById("euclid_go").addEventListener("click",()=>{
	let tds;
	tds="<tr><td>i</td><td>q<sub>i</sub></td><td>a<sub>i</sub></td><td>x<sub>i</sub></td><td>y<sub>i</sub></td>";
	if(euclid_checkbox.checked){
		tds+=`<td>a<sub>i</sub></td><td>&equals;</td><td>a<sub>i-2</sub></td><td>&minus;</td><td>q<sub>i</sub></td><td>&times;</td><td>a<sub>i-1</sub></td>`;
	}
	document.getElementById("euclid_table").innerHTML=`${tds}</tr>`;
	let i=2;
	let q=["",""];
	let a=[Math.max(euclid_m.value,euclid_n.value),Math.min(euclid_m.value,euclid_n.value)];
	let x=[1,0];
	let y=[0,1];
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
	for(let j=0; j<=i; j++){
		const euclidTr=document.createElement("tr");
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
		euclidTr.innerHTML=tds;
		document.getElementById("euclid_table").appendChild(euclidTr);
	}
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
	document.getElementById("bekijoyo_table").innerHTML="<tr><td>i</td><td>x<sub>i</sub></td><td>y</td><td>ay&prime;</td><td>y&prime;</td></tr>";
	let a=bekijoyo_a.value, m=bekijoyo_m.value;
	let bin=binary(bekijoyo_x.value);
	let x=[Number(bin.charAt(0))];
	let y=[a];
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
	let tds;
	let binGray="";
	for(let i=0; i<bin.length; i++){
		const bekijoyoTr=document.createElement("tr");
		if(i==bin.length-1){
			tds=`<td class="red">${y[i]}</td>`;
		}else{
			tds=`<td>${y[i]}</td>`;
		}
		if(x[i]==0){
			tds=`<td>${bin.length-i-1}</td><td class="gray">0</td>${tds}<td class="tac gray">&lt;&minus;</td><td>${yPrime[i]}</td>`;
			binGray+="<span class='gray'>0</span>";
		}else{
			tds=`<td>${bin.length-i-1}</td><td>1</td>${tds}<td>${ay[i]}</td><td>${yPrime[i]}</td>`;
			binGray+="1";
		}
		bekijoyoTr.innerHTML=tds;
		document.getElementById("bekijoyo_table").appendChild(bekijoyoTr);
	}
	document.getElementById("bekijoyo_table").classList.remove("none");
	document.getElementById("bekijoyo_binary").innerHTML=`${bekijoyo_x.value}<sub>(10)</sub>&nbsp;&equals;&nbsp;${binGray}<sub>(2)</sub>`;
	document.getElementById("bekijoyo_equation").innerHTML=`&nbsp;&therefore;&nbsp;${a}<sup>${bekijoyo_x.value}</sup>&nbsp;mod&nbsp;${m}&nbsp;&equals;&nbsp;<span class="red">${y[bin.length-1]}</span>`;
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