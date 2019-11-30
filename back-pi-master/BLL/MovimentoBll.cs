using System.Collections.Generic;
using back_pi.DAL.DAO;
using back_pi.DAL.DTO;
using back_pi.DAL.DAO.Relatorios;

namespace back_pi.BLL
{
    public class MovimentoBll : IMovimentoBll
    {
        public string Movimento = "Movimento";

        public readonly IMovimentoDAO _movimentoDAO;
        public MovimentoBll(IMovimentoDAO movimentoDAO)
        {
            _movimentoDAO = movimentoDAO;
        }

        public List<MovimentoDTO> ObterTodosMovimentos()
        {
            var verifica = _movimentoDAO.ObterTodosMovimentos();

            if(verifica == null){ return null; }
            
            this.Movimento = "Metodo ObterTodosMovimentos() BLL executado corretamente";
            
            return verifica;
        }
          
        public ICollection<Grafico> ObterGrafico()
        {
            var verifica = _movimentoDAO.ObterGrafico();

            if(verifica == null){ return null; }
            
            this.Movimento = "Metodo ObterGrafico() BLL executado corretamente";
            
            return verifica;
        }

        public ICollection<GraficoInd> ObterGraficoInd(string idVendedor)
        {
            if((idVendedor != null)&&(idVendedor != ""))
            {
               return _movimentoDAO.ObterGraficoInd(idVendedor); 
            }  
            return null;
        }
        
        public List<MovimentoDTO> MovimentosVendedores()
        {
            var verifica = _movimentoDAO.MovimentosVendedores();

            if(verifica == null){ return null; }
            
            this.Movimento = "Metodo MovimentosVendedores() BLL executado corretamente";
            
            return verifica;
        }

        public List<MovimentoDTO> MovimentosVendedoresNãoSucedido()
        {
            var verifica = _movimentoDAO.MovimentosVendedoresNãoSucedido();

            if(verifica == null){ return null; }
            
            this.Movimento = "Metodo MovimentosVendedoresNãoSucedido() BLL executado corretamente";
            
            return verifica;
        }

        public MovimentoDTO ObterMovimentoPorId(string idMovimento)
        {
            if((idMovimento != null)&&(idMovimento != ""))
            {
               return _movimentoDAO.ObterMovimentoPorId(idMovimento); 
            }  
            return null;
        }

        public List<MovimentoDTO> ObterMovimentosPorVendedor(string idVendedor)
        {
            if((idVendedor != null)&&(idVendedor != ""))
            {
               return _movimentoDAO.ObterMovimentosPorVendedor(idVendedor); 
            }  
            return null;
        }

        public List<MovimentoDTO> ObterMovimentosTipoVenda()
        {
            var verifica = _movimentoDAO.ObterMovimentosTipoVenda();

            if(verifica == null){ return null; }
            
            this.Movimento = "Metodo ObterMovimentosTipoVenda() BLL executado corretamente";
            
            return verifica;
        }

        public List<MovimentoDTO> ObterMovimentosTipoAusencia()
        {
            var verifica = _movimentoDAO.ObterMovimentosTipoAusencia();

            if(verifica == null){ return null; }
            
            this.Movimento = "Metodo ObterMovimentosTipoAusencia() BLL executado corretamente";
            
            return verifica;
        }

        public void AdicionarNovoMovimento(MovimentoDTO movimento)
        {
            if((movimento != null)&&(movimento.IdVendedor != null))
            {
                _movimentoDAO.AdicionarNovoMovimento(movimento);
            }
            
            this.Movimento = "Falha na execucao do metodo AdicionarNovoMovimento() BLL";
        }

        public void FinalizarMovimento(MovimentoDTO movimento)
        {
            if((movimento != null)&&(movimento.IdVendedor != null))
            {
                _movimentoDAO.FinalizarMovimento(movimento);
            }
            
            this.Movimento = "Falha na execucao do metodo FinalizarMovimento() BLL";
        }

        public void AtualizarMovimento(string idMovimento, MovimentoDTO movimentoNew)
        {
            if((idMovimento != null)&&(movimentoNew != null))
            {
                _movimentoDAO.AtualizarMovimento(idMovimento, movimentoNew);
            }
            this.Movimento = "Falha na execucao do metodo AtualizarMovimento() BLL";
        }

        public void ExcluirMovimento(string idMovimento)
        {
            if((idMovimento != null)&&(idMovimento != ""))
            {
                _movimentoDAO.ExcluirMovimento(idMovimento);
            }
            this.Movimento = "Falha na execucao do metodo ExcluirMovimento() BLL";
        }
    }
}