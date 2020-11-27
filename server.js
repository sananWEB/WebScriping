const cheerio=require("cheerio")
const fs=require("fs")
const json2csv=require("json2csv").Parser
const reqest1=require("request-promise")
const reqest2=require("request")


const movies=[
"https://www.imdb.com/title/tt7984734/?ref_=ttls_li_tt",
"https://www.imdb.com/title/tt6473300/?ref_=nv_sr_srsg_0",
"https://www.imdb.com/title/tt2707408/?ref_=nv_sr_srsg_0",

];


( async()=>{
    const imdb=[];


    for(let movie of movies){


        const reponse= await reqest1({
            uri:movie,
            headers:{
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
            },
            gzip:true,
             
        })
    
        const $=cheerio.load(reponse);
        const title=$("div[class=title_wrapper]>h1").text().trim()
    const releseDate=$('a[title="See more release dates"]').text().trim()
    const rating=$("div[class=ratingValue]>strong>span").text()
     
    imdb.push({
        title,releseDate,rating,
    });
    

    }
     


const j2c= new json2csv();
const csv=j2c.parse(imdb)

fs.writeFileSync("./imdb.csv",csv,"utf-8");


})
()

