class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :foto
      t.string :nombre
      t.string :apellidos
      t.string :email
      t.string :clave_digest
      t.string :tipo

      t.timestamps
    end
  end
end
