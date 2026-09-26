async function getPoster() {
  const titles = [
    { title: 'Ek Tha Tiger', id: '100520-ek-tha-tiger' },
    { title: 'Tiger Zinda Hai', id: '457885-tiger-zinda-hai' },
    { title: 'War 2019', id: '585268-war' },
    { title: 'Pathaan', id: '864692-pathaan' },
    { title: 'Tiger 3', id: '822055-tiger-3' }
  ];
  
  for (const m of titles) {
    const res = await fetch(`https://www.themoviedb.org/movie/${m.id}`);
    const text = await res.text();
    const match = text.match(/<meta property="og:image" content="(.*?)"/);
    if (match) {
      console.log(m.title, match[1]);
    } else {
      console.log(m.title, "Not found");
    }
  }
}
getPoster();
