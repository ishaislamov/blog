import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        res.json(tags)
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось загрузить тэги'
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)

    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось загрузить статьи'
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate({
            _id: postId,
        },  {
            $inc: {viewsCount: 1}
        }, {
            returnDocument: 'after'
        },
        (error, doc) => {
            if (error) {
                console.log(error);
               return res.status(500).json({
                    message: 'Не удалось загрузить статью'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }

            res.json(doc)

        }).populate('user')
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось загрузить статьи'
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
            imageUrl: req.body.imageUrl,
        })

        const post = await doc.save();
        res.json(post);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({
            _id: postId,
        }, (error, doc) => {
            if (error) {
                console.log(error);
               return res.status(500).json({
                    message: 'Не удалось удалить статью'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }
            res.json({
                message: 'Статья удалена',
            })
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось загрузить статьи'
        })
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        },{
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            user: req.userId,
            imageUrl: req.body.imageUrl,
        });

        res.json({
            message: 'Статья обновлена'
        })
    } catch(error) {
        console.log(error)
    }
}