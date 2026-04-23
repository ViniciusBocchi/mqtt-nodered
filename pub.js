  import mqtt from "mqtt";

  const client = mqtt.connect("mqtt://localhost:1883", {
      will: {
          topic: "estufa/status",
          payload: "OFFLINE",
          qos: 1,
          retain: true
      }
  });

  client.on("connect", () => {
    console.log("PUB QoS1: conectado");
    client.publish("estufa/status", "ONLINE", { qos: 1, retain: true});
    let i = 0;
    
    const t = setInterval(() => {
      let nivel = Math.floor(Math.random() * 1000);
      client.publish("estufa/agua/nivel", `${nivel}`, { qos: 1, retain: true});
      console.log(`PUB QoS1 enviou o nivel de indice ${i} com o valor ${nivel} L`);    
      i++;

      if (i === 100) {
        clearInterval(t);
        client.end();
      }
    }, 1000);
  });