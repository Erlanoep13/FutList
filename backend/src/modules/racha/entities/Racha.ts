import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { RachaNome } from './RachaNome';

@Entity('rachas')
export class Racha {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ nullable: true })
  cabecalho!: string; // Ex: "Racha 18:30 quadra padre paulo"

  @Column({ type: 'integer' })
  quantidade_por_time!: number; // Ex: 5

  @CreateDateColumn()
  createdAt!: Date;

  // Relacionamento: Um racha tem muitos nomes/jogadores
  @OneToMany(() => RachaNome, (rachaNome) => rachaNome.racha)
  nomes!: RachaNome[];
}