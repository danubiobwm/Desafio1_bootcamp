const express = require('express');
const server =express();

server.use(express.json);


let numberOfRequest=0;

const projetos =[];

function checkProjetosExists(req, res, next){
  const { id } = req.params;
  const projeto=projetos.find(p=>p.id==id);

  if(!projeto){
    return res.status(400).json({error:'Projeto not Found'});
  }
  return next()
}

function logRequests(req, res, next){
  numberOfRequest++;

  console.log(`numero de requisição: ${numberOfRequest}`);
  return next()
}

server.use(logRequests);

server.get('/projetos', (req,res)=>{
  return res.json(projetos);

});

server.post('/projetos', (req, res)=>{
  const {id, title} = req.body;

  const projeto={
    id, 
    title,
    tasks:[]
  };
projetos.push(projeto);
return res.json(projeto);

});


server.put('/projetos:id', checkProjetosExists, (req, res)=>{
  const {id} = req.params;
  const {title} = req.body;

  const project = projetos.find(p=>p.id==id);
  project.title=title;
  return res.json(project);
});

server.delete('/projetos:id', checkProjetosExists, (req, res)=>{
  const{id} = res.params;
  const projetoIndex =projetos.findIndex(p=>p.id==id);
  projetos.splice(projetoIndex, 1);

  return res.send();
});

server.post ('/projetos:id/tasks', checkProjetosExists, (req, res)=>{
  const {id}=req.params;
  const {title}=req.body;

  const projeto = projetos.find(p=id == id);
  projeto.tasks.push(title);
  return res.json(projeto);
})

server.listen(3000);