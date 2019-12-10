let statements = {
    insertnewImage: {
        statement: ` INSERT INTO items_images (
                                  items_images_id,
                                  images_id,
                                  serial_no,
                                  file_name,
                                  file_path,
                                  image_type,
                                  default_image
                              ) VALUES (
                                  IMAGES_SEQ.NEXTVAL,
                                  :IMAGES_ID,
                                  :SERIAL_NO,
                                  :FILE_NAME,
                                  :FILE_PATH,
                                  1,
                                  0
                              ) RETURN
                                 IMAGES_ID,
                                 SERIAL_NO,
                                 FILE_PATH,
                                 FILE_NAME,
                                 ITEMS_IMAGES_ID
                              INTO
                                  :R_IMAGES_ID,
                                  :R_SERIAL_NO,
                                  :R_FILE_PATH ,
                                  :R_FILE_NAME,
                                  :R_ITEMS_IMAGES_ID`,
                                  
              returns: [
                                "R_IMAGES_ID",
                                "R_SERIAL_NO",
                                "R_FILE_PATH",
                                "R_FILE_NAME",
                                "R_ITEMS_IMAGES_ID"
              ],
              bindings: [],
              qstring: "",
              requireCommit: true
          },
          getsingImage: {
        statement: `SELECT
            items_images_id,
            images_id,
            serial_no,
            file_name,
            file_path,
            image_type,
            default_image,
            db_image,
            notes
        FROM
            items_images
    where file_name = :FILE_NAME`,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    getImages: {
        statement: `SELECT
            items_images_id,
            images_id,
            serial_no,
            file_name,
            file_path,
            image_type,
            default_image,
            db_image,
            notes
        FROM
            items_images
        `,
        bindings: [],
        qstring: "",
        requireCommit: false
    },
    deleteImages:{
        statement: `update items_images
        set deleted = 1
        where items_images_id = :items_images_id
    `,
    bindings: [],
    qstring: "",
    requireCommit: true
    }
};

module.exports = statements;
