const cluster = require('cluster')

function startWorker() {
  const worker = cluster.fork()
  console.log(`CLUSTER: Worker ${worker.id} started`)
}

//이전 문법은 cluster.isMaster, 노드 16부터는 아래 문법
//프로세싱중
if(cluster.isPrimary){

  //os에서 cpu의 스레드만큼 startWoker 실행
  require('os').cpus().forEach(startWorker)

  cluster.on('disconnect', worker => console.log(
    `CLUSTER: Worker ${worker.id} disconnected from the cluster.`
  ))

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `CLUSTER: Worker ${worker.id} died with exit ` +
      `code ${code} (${signal})`
    )
    startWorker()
  })

} else {

    const port = process.env.PORT || 3000
    require('./01-server.js')(port)

}
