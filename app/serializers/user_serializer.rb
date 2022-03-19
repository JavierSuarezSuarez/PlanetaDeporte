class UserSerializer < ActiveModel::Serializer
  attributes :id, :foto, :nombre, :apellidos, :email, :clave_digest, :tipo
end
