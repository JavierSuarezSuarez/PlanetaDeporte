# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Article.destroy_all
Comment.destroy_all

file = File.read(Rails.root + './public/data.json')
data_parsed = JSON.parse(file)
usuarios = data_parsed['data'][0]['usuarios']
noticias = data_parsed['data'][1]['noticias']
comentarios = data_parsed['data'][2]['comentarios']

for i in 0...usuarios.length
  User.create(:foto => usuarios[i]['foto'], :nombre => usuarios[i]['nombre'], :apellidos => usuarios[i]['apellidos'],
              :email => usuarios[i]['email'], :clave_digest => usuarios[i]['clave'], :tipo => usuarios[i]['tipo'])
end

for j in 0...noticias.length
  Article.create(:user_id => noticias[j]['idautor'], :foto => noticias[j]['foto'], :fecha => noticias[j]['fecha'], :titulo => noticias[j]['titulo'],
                 :subtitulo => noticias[j]['subtitulo'], :seccion => noticias[j]['seccion'],
                 :cuerpo => noticias[j]['cuerpo'])
end

for k in 0...comentarios.length
  Comment.create(:user_id => comentarios[k]['idautor'], :article_id => comentarios[k]['idnoticia'], :texto => comentarios[k]['texto'])
end
