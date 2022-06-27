import axios from "axios";
import type { NextPage } from "next";
import { Card, Carousel, Modal } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import fileJSON from "./../unfold.json";

const Home: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const getImage = () => {
    axios.get("api/getImage").finally(() => {});
  };

  return (
    <>
      {!isSSR && (
        <div>
          {fileJSON?.length > 0 && (
            <Modal
              title="Minhas imagens"
              visible={isModalVisible}
              onCancel={handleOk}
            >
              <Carousel>
                {fileJSON?.map((img, index) => (
                  <Card key={index}>
                    <div className="content">
                      <img src={img.src} alt="Picture" />
                    </div>
                    <h3 className="title">{index}</h3>
                  </Card>
                ))}
              </Carousel>
            </Modal>
          )}
        </div>
      )}
      {/* <h3 className="title" onClick={() => getImage()}>
        1
      </h3> */}
    </>
  );
};

export default Home;
