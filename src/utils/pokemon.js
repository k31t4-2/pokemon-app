
// 全てのポケモンの情報をとってくる
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

// 一つ一つのポケモンの詳細情報をとってくる。（App.jsのgetPokemonで取得したurlをもとにfetch）
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
    })
  })
}
